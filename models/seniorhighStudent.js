const mongoose = require("mongoose");

const seniorhighstudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    unique: true, // 🚨 If this is causing errors, remove "unique: true"
    default: function () {
      return new mongoose.Types.ObjectId().toHexString(); // Generates unique ID
    },
  },

  
  firstName: String,
  lastName: String,
  grade: String,
  section: String,
  strand: String,
  gender: String,
  personalQuote: String,
  profilePicture: String,
});

const SeniorhighStudent = mongoose.model("SeniorhighStudent", seniorhighstudentSchema, "seniorhigh_students");
module.exports = SeniorhighStudent;

