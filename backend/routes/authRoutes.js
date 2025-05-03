const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const AuthUser = require("../models/AuthUser");
require("dotenv").config();

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Please provide phone number and password' });
  }

  try {
    // const admin = await Admin.findOne({ phoneNumber });
    const user = await AuthUser.findOne({ phoneNumber }).select('+password');

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
      success: true,
      token,
      role: user.role 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

// Add Admin Route
router.post("/add-admin", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Please provide phone number and password' });
  }

  try {
    // const admin = await Admin.findOne({ phoneNumber });
    const existingUser = await AuthUser.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Phone number is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await AuthUser.create({
      phoneNumber,
      password: hashedPassword,
      role: 'admin'
    });

    res.status(201).json({ success: true, message: "Admin user created successfully", adminId: newAdmin._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Add Admin Route
router.post("/sign-up", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: 'Please provide phone number and password' });
  }

  try {
    // const admin = await Admin.findOne({ phoneNumber });
    const existingUser = await AuthUser.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Phone number is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newNormalUser = await AuthUser.create({
      phoneNumber,
      password: hashedPassword,
      role: 'normal'
    });

    res.status(201).json({ success: true, message: "User created successfully", userId: newNormalUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
  

module.exports = router;
