const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { autoSelectFamily: false })
  .then(async () => {
    console.log("MongoDB Connected");

    const hashedPassword = await bcrypt.hash("<your_password>", 10);

    const admin = new Admin({
      phoneNumber: "<your_phone_number>",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.error("MongoDB Connection Error:", err));
