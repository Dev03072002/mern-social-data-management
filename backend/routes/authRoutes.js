const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
require("dotenv").config();

const router = express.Router();

// Admin Login Route
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const admin = await Admin.findOne({ phoneNumber });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Validate token route
router.get("/validate", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ message: "Token is valid", userId: decoded.id });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
});
  

module.exports = router;
