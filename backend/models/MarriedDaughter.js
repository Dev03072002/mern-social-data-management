const mongoose = require("mongoose");

const marriedDaughterSchema = new mongoose.Schema({
    mainMemberId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    middleName: String,
    surname: String,
    sex: String,
    birthday: Date,
    bloodGroup: String,
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
    darjiGod: String,
    email: String,
    education: String,
    occupation: String,
    companyName: String,
    designation: String,
    monthlyIncome: Number,
    passportPhoto: String,
    helpDarjiSamaj: String,
    familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "DaughterFamilyMember" }],
}, { timestamps: true });

module.exports = mongoose.model("MarriedDaughter", marriedDaughterSchema);
