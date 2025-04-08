import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";  // PostgreSQL connection

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, pin } = req.body;

  try {
    // Check if email already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash pin code
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);

    // Insert the user into the database
    const newUser = await pool.query(
      "INSERT INTO users (name, email, pin_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPin]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login a user using only pin code
router.post("/login", async (req, res) => {
  const { pin_code } = req.body;  // Only expecting pin_code

  try {
    // Find the user by pin code (we'll assume pin_hash is stored in the database)
    const user = await pool.query("SELECT * FROM users WHERE pin_hash IS NOT NULL");

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    // Loop through the users and compare the pin_code with the stored pin_hash
    for (let i = 0; i < user.rows.length; i++) {
      const validPin = await bcrypt.compare(pin_code, user.rows[i].pin_hash);
      
      if (validPin) {
        // If PINs match, generate a JWT token
        const token = jwt.sign(
          { id: user.rows[i].id, is_admin: user.rows[i].is_admin },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.json({ token, user: user.rows[i] });
      }
    }

    // If no matching pin found
    return res.status(400).json({ error: "Invalid pin code" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
