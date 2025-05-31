const mongoose = require("mongoose");

const AuthUserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required for login"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'normal', 'superadmin'],
    required: true,
    default: 'normal'
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AuthUser", AuthUserSchema);