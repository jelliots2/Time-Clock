import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";  // Import the auth routes
import userRoutes from "./routes/users.js";  // Import the user routes
import timeEntryRoutes from "./routes/timeEntries.js";  // Import the time entry routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register the routes for different endpoints
app.use("/api/auth", authRoutes);  // All auth routes will be prefixed with /api/auth
app.use("/api/users", userRoutes);  // All user routes will be prefixed with /api/users
app.use("/api/time", timeEntryRoutes);  // All time entry routes will be prefixed with /api/time

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
