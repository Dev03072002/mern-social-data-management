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

        // Parse the address JSON string back to an object
        if (req.body.address) {
            userData.address = JSON.parse(req.body.address);
        }

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

// POST route to get all users details
router.get("/list-main-members", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get route to fetch single user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Put route to edit a single user
router.put("/:id", upload.single("passportPhoto"), async (req, res) => {
    try {
        // Fetch the existing user first to preserve existing familyMembers
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        let updatedData = { ...req.body };

        // Parse the address JSON string back to an object
        if (req.body.address) {
            try {
                updatedData.address = JSON.parse(req.body.address);
            } catch (error) {
                console.error("Invalid JSON format for address:", req.body.address);
                return res.status(400).json({ success: false, message: "Invalid address format" });
            }
        }        

        // Convert passport photo if provided
        if (req.file) {
            updatedData.passportPhoto = req.file.buffer.toString("base64");
        }

        // Preserve existing familyMembers if not explicitly updated
        updatedData.familyMembers = existingUser.familyMembers;
        updatedData.marriedDaughters = existingUser.marriedDaughters;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        
        res.json({ success: true, message: "User updated successfully", userId: updatedUser._id });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete route to delete a single user
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
