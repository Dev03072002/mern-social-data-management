const mongoose = require("mongoose");

const daughterFamilyMemberSchema = new mongoose.Schema({
    daughterId: { type: mongoose.Schema.Types.ObjectId, ref: "MarriedDaughter", required: true },
    relation: { type: String, enum: ["Son In Law", "Son", "Daughter", "Grand Son", "Grand Daughter"], required: true },
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
    yearlyIncome: Number,
    passportPhoto: String,
    helpDarjiSamaj: String,
}, { timestamps: true });

module.exports = mongoose.model("DaughterFamilyMember", daughterFamilyMemberSchema);
