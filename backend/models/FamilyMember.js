const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
    mainMemberId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    relation: { type: String, enum: ["Wife", "Husband", "Son", "Daughter", "Mother", "Father", "Brother", "Sister", "Daughter In Law", "Grand Son", "Grand Daughter"], required: true },
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

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
