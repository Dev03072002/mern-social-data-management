const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

// Import your User model
const User = require("./models/User"); 

async function backupCollection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { autoSelectFamily: false });
    console.log("✅ MongoDB Connected");

    // Fetch all users
    const users = await User.find().lean();

    // Save to JSON file
    fs.writeFileSync("users-backup.json", JSON.stringify(users, null, 2));
    console.log("📂 Backup complete: users-backup.json");

    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error backing up:", err);
  }
}

backupCollection();
