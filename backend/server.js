const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const path = require('path');

const authModule = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const familyRoutes = require("./routes/FamilyMemberRoutes");
const daughterDetailsRoutes = require("./routes/MarriedDaughterRoutes");
const daughterFamilyRoutes = require("./routes/MarriedDaughterFamilyMemberRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { autoSelectFamily: false })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authModule.router);
app.use("/api/users", userRoutes);
app.use("/api/family", familyRoutes, daughterDetailsRoutes, daughterFamilyRoutes);

// const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Sample API Route
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown (When stopping the server)
process.on("SIGINT", async () => {
    // await client.close();
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});
