const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// 🔒 Security middlewares
app.use(helmet()); // sets secure HTTP headers
app.use(cors({
  origin: "https://localhost:5173", // allow your frontend
  credentials: true
}));
app.use(express.json()); // parse JSON bodies

// 🛣️ Routes
const authRoutes = require("./src/routes/authRoutes");       // correct path
const { protect } = require("./src/middleware/authMiddleware"); // correct path


app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}!`,
    timestamp: new Date()
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("🔐 SecureBlog API is running over HTTPS!");
});

module.exports = app;
