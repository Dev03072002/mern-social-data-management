const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const MarriedDaughter = require("../models/MarriedDaughter");

const router = express.Router();

// Multer setup for file uploads (Passport Photo)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add-daughter-detail", upload.single("passportPhoto"), async (req, res) => {
    try {
        const { mainMemberId, ...familyData } = req.body;

        // Validate if the main member exists
        const mainMember = await User.findById(mainMemberId);
        if (!mainMember) {
            return res.status(404).json({ success: false, message: "Main family member not found" });
        }

        // Convert passport photo to Base64 (For simplicity)
        if (req.file) {
            familyData.passportPhoto = req.file.buffer.toString("base64");
        }
        // Create a new family member
        const newMarriedDaughter = new MarriedDaughter({ mainMemberId, ...familyData });
        await newMarriedDaughter.save();

        // Add family member reference to the main user
        mainMember.marriedDaughters.push(newMarriedDaughter._id);
        await mainMember.save();

        res.status(201).json({ success: true, message: "Mrried Daughter Details added successfully", marriedDaughterId: newMarriedDaughter._id });
    } catch (error) {
        console.error("Error adding married daughter details:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
