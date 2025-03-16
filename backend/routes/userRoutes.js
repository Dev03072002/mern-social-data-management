const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

// Multer setup for file uploads (Passport Photo)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to save user details
router.post("/register", upload.single("passportPhoto"), async (req, res) => {
    try {
        const userData = { ...req.body };

        // Convert passport photo to Base64 (For simplicity)
        if (req.file) {
            userData.passportPhoto = req.file.buffer.toString("base64");
        }

        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully", userId: newUser._id });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
