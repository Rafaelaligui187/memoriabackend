const mongoose = require("mongoose");

const highschoolstudentSchema = new mongoose.Schema({
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
  gender: String,
  personalQuote: String,
  profilePicture: String,
});

const HighschoolStudent = mongoose.model("HighschoolStudent", highschoolstudentSchema, "highschool_students");
module.exports = HighschoolStudent;

