const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    middleName: String,
    surname: String,
    sex: String,
    birthday: Date,
    bloodGroup: String,
    nativePlace: String,
    totalMembers: Number,
    address: {
        houseNo: String,
        society: String,
        landmark: String,
        area: String,
        taluka: String,
        district: String,
        pincode: String,
    },
    contactNo: String,
    whatsappNo: String,
    maritalStatus: String,
    marriageDate: Date,
    email: String,
    education: String,
    occupation: String,
    companyName: String,
    designation: String,
    yearlyIncome: Number,
    passportPhoto: String,
    helpDarjiSamaj: String,
    familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }],
    marriedDaughters: [{ type: mongoose.Schema.Types.ObjectId, ref: "MarriedDaughter" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
