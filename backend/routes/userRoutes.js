const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const FamilyMember = require("../models/FamilyMember");
const { protect, adminOnly, adminOrSuperAdminOnly } = require("./authRoutes");

const router = express.Router();

// Multer setup for file uploads (Passport Photo)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to save user details
router.post("/register", protect, adminOrSuperAdminOnly, upload.single("passportPhoto"), async (req, res) => {
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

        if (req.user && req.user.id && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
            userData.createdBy = req.user.id;
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
router.get("/list-main-members", protect, async (req, res) => {
    try {
        let query = {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        if (req.user && req.user.role === 'admin') {
            query.createdBy = req.user.id;
        }

        const totalUsers = await User.countDocuments(query);
        const users = await User.find(query)
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'name');
        res.json({users, totalUsers, page, totalPages: Math.ceil(totalUsers / limit)});
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get route to fetch single user
router.get("/:id", protect, async (req, res) => {
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
router.put("/:id", protect, adminOrSuperAdminOnly, upload.single("passportPhoto"), async (req, res) => {
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

        if (existingUser.createdBy) {
            updatedData.createdBy = existingUser.createdBy;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        
        res.json({ success: true, message: "User updated successfully", userId: updatedUser._id });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete route to delete a single user
router.delete("/delete/:id", protect, adminOrSuperAdminOnly, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await FamilyMember.deleteMany({ _id: { $in: user.familyMembers } });

        await User.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "User and associated family members deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
