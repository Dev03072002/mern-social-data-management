const express = require("express");
const multer = require("multer");
const FamilyMember = require("../models/FamilyMember");
const User = require("../models/User");
const MarriedDaughter = require("../models/MarriedDaughter");
const DaughterFamilyMember = require("../models/DaughterFamilyMember");

const router = express.Router();

// Multer setup for file uploads (Passport Photo)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add-daughter-family-member", upload.single("passportPhoto"), async (req, res) => {
    try {
        const { daughterId, ...familyData } = req.body;

        // Validate if the main member exists
        const daughterDetails = await MarriedDaughter.findById(daughterId);
        if (!daughterDetails) {
            return res.status(404).json({ success: false, message: "Details not found" });
        }

        // Convert passport photo to Base64 (For simplicity)
        if (req.file) {
            familyData.passportPhoto = req.file.buffer.toString("base64");
        }

        // Create a new family member
        const newDaughterFamilyMember = new DaughterFamilyMember({ daughterId, ...familyData });
        await newDaughterFamilyMember.save();

        // Add family member reference to the main user
        daughterDetails.familyMembers.push(newDaughterFamilyMember._id);
        await daughterDetails.save();

        res.status(201).json({ success: true, message: "Family member added successfully", familyMemberId: newDaughterFamilyMember._id });
    } catch (error) {
        console.error("Error adding family member:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
