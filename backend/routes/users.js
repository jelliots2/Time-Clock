import express from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Use this instead of verifyToken
import adminMiddleware from "../middleware/adminMiddleware.js"; // Use this instead of verifyAdmin

const router = express.Router();

// Get user profile by ID (User can view their own profile or admins can view any)
router.get("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;

  if (req.user.id != id && !req.user.is_admin) {
    return res.status(403).json({ error: "Access denied." });
  }

  try {
    const user = await pool.query("SELECT id, name, email, is_admin FROM users WHERE id = $1", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Update user profile by ID (User can update their own profile, admin can update anyone)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (req.user.id != id && !req.user.is_admin) {
    return res.status(403).json({ error: "Access denied." });
  }

  try {
    const updatedUser = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, is_admin",
      [name, email, id]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Admin view: Get all users (Admins only)
router.get("/", adminMiddleware, async (req, res) => {
  console.log(req.user);
  try {
    const allUsers = await pool.query("SELECT id, name, email, is_admin FROM users");

    res.json(allUsers.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Admin delete user by ID (Admins only)
router.delete("/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", userId: id });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
