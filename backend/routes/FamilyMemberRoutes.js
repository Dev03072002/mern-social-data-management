const express = require("express");
const multer = require("multer");
const FamilyMember = require("../models/FamilyMember");
const User = require("../models/User");

const router = express.Router();

// Multer setup for file uploads (Passport Photo)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add-family-member", upload.single("passportPhoto"), async (req, res) => {
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
        const newFamilyMember = new FamilyMember({ mainMemberId, ...familyData });
        await newFamilyMember.save();

        // Add family member reference to the main user
        mainMember.familyMembers.push(newFamilyMember._id);
        await mainMember.save();

        res.status(201).json({ success: true, message: "Family member added successfully", familyMemberId: newFamilyMember._id });
    } catch (error) {
        console.error("Error adding family member:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get("/family-members/:id", async (req, res) => {
    try {
        const familyMembers = await FamilyMember.find({ mainMemberId: req.params.id });
        res.json(familyMembers);
    } catch (error) {
        console.error("Error fetching family members:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get route to fetch single user
router.get("/:id", async (req, res) => {
    try {
        const familyMember = await FamilyMember.findById(req.params.id);
        if (!familyMember) return res.status(404).json({ message: "Family member not found" });
        res.json(familyMember);
    } catch (error) {
        console.error("Error fetching familyMember:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Put route to edit a single user
router.put("/:id", upload.single("passportPhoto"), async (req, res) => {
    try {
        // Fetch the existing user first to preserve existing familyMembers
        const existingFamilyMember = await FamilyMember.findById(req.params.id);
        if (!existingFamilyMember) return res.status(404).json({ message: "Family member not found" });

        let updatedData = { ...req.body };       

        // Convert passport photo if provided
        if (req.file) {
            updatedData.passportPhoto = req.file.buffer.toString("base64");
        }

        // Preserve existing familyMembers if not explicitly updated
        updatedData.mainMemberId = existingFamilyMember.mainMemberId;

        const updatedFamilyMember = await FamilyMember.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        
        res.json({ success: true, message: "Family member updated successfully", familyMemberId: updatedFamilyMember._id });
    } catch (error) {
        console.error("Error updating Family member:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const familyMember = await FamilyMember.findById(id);
        if (!familyMember) return res.status(404).json({ message: "Family member not found" });

        await User.updateOne(
            { familyMembers: id },
            { $pull: { familyMembers: id } }
        );

        await FamilyMember.findByIdAndDelete(id);

        res.json({ success: true, message: "Family member deleted successfully" });
    } catch (error) {
        console.error("Error deleting Family member:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
