import express from "express";
import pool from "../db.js";  // PostgreSQL connection
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Clock in: Create a time entry when the user clocks in
router.post("/clockin", authMiddleware, async (req, res) => {
  const userId = req.user.id;  // Use user ID from token
  const clockInTime = new Date();

  try {
    const newTimeEntry = await pool.query(
      "INSERT INTO time_entries (user_id, clock_in) VALUES ($1, $2) RETURNING id, user_id, clock_in",
      [userId, clockInTime]
    );

    res.status(201).json(newTimeEntry.rows[0]); // Return the new time entry
  } catch (err) {
    res.status(500).json({ error: "Error clocking in" });
  }
});

// Clock out: Update the time entry with the clock-out time
router.post("/clockout", authMiddleware, async (req, res) => {
  const userId = req.user.id;  // Use user ID from token
  const clockOutTime = new Date();

  try {
    const timeEntry = await pool.query(
      "SELECT * FROM time_entries WHERE user_id = $1 AND clock_out IS NULL ORDER BY clock_in DESC LIMIT 1",
      [userId]
    );

    if (timeEntry.rows.length === 0) {
      return res.status(400).json({ error: "No active clock-in found" });
    }

    const clockInTime = timeEntry.rows[0].clock_in;

    const updatedTimeEntry = await pool.query(
      "UPDATE time_entries SET clock_out = $1 WHERE id = $2 RETURNING id, clock_in, clock_out",
      [clockOutTime, timeEntry.rows[0].id]
    );

    // Calculate the total time worked in hours
    const totalTimeWorked = (clockOutTime - new Date(clockInTime)) / 3600000;  // Convert ms to hours

    res.json({
      ...updatedTimeEntry.rows[0],
      total_time: totalTimeWorked // Add total_time field
    });
  } catch (err) {
    console.log("Database Error:", err);
    res.status(500).json({ error: "Error clocking out" });
  }
});

router.get("/all-time", adminMiddleware, async (req, res) => {
  try {
    const timeEntries = await pool.query(
      "SELECT * FROM time_entries ORDER BY clock_in DESC"
    );
    res.json(timeEntries.rows);  // Return all time entries
  } catch (err) {
    console.log("Database Error:", err);
    res.status(500).json({ error: "Error fetching all time entries" });
  }
});

// Get all time entries for a user
router.get("/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  const userIdInt = parseInt(userId, 10);
  if (isNaN(userIdInt)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  if (userIdInt !== req.user.id && !req.user.is_admin) {
    return res.status(403).json({ error: "You can only view your own time entries" });
  }

  try {
    const timeEntries = await pool.query(
      "SELECT * FROM time_entries WHERE user_id = $1 ORDER BY clock_in DESC",
      [userIdInt]
    );

    res.json(timeEntries.rows);
  } catch (err) {
    console.log("Database Error:", err);
    res.status(500).json({ error: "Error fetching time entries "});
  }
});

// Get time worked for the day/week for a user
router.get("/summary/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  
  if (parseInt(userId) !== req.user.id) {
    return res.status(403).json({ error: "You can only view your own time summary" });
  }

  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));  // Start of the current week (Sunday)
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));  // End of the current week (Saturday)

  try {
    const timeSummary = await pool.query(`
      SELECT user_id, SUM(EXTRACT(EPOCH FROM clock_out - clock_in) / 3600) AS total_hours
      FROM time_entries
      WHERE user_id = $1 AND clock_in >= $2 AND clock_out <= $3
      GROUP BY user_id
    `, [userId, startOfWeek, endOfWeek]);

    if (timeSummary.rows.length === 0) {
      return res.status(404).json({ error: "No time entries found for this period" });
    }

    res.json(timeSummary.rows[0]);
  } catch (err) {
    console.log("Database Error:", err);
    res.status(500).json({ error: "Error fetching time summary" });
  }
});

export default router;
