const mongoose = require("mongoose");

const daughterFamilyMemberSchema = new mongoose.Schema({
    daughterId: { type: mongoose.Schema.Types.ObjectId, ref: "MarriedDaughter", required: true },
    relation: { type: String, enum: ["son-in-law", "son", "daughter", "grandson", "granddaughter"], required: true },
    name: String,
    middleName: String,
    surname: String,
    sex: String,
    birthday: Date,
    bloodGroup: String,
    contactNo: String,
    maritalStatus: String,
    marriageDate: Date,
    education: String,
    occupation: String,
    companyName: String,
    designation: String,
    monthlyIncome: Number,
    passportPhoto: String,
    helpDarjiSamaj: String,
}, { timestamps: true });

module.exports = mongoose.model("DaughterFamilyMember", daughterFamilyMemberSchema);
