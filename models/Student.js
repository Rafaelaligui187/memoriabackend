const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    unique: true, // 🚨 If this is causing errors, remove "unique: true"
    default: function () {
      return new mongoose.Types.ObjectId().toHexString(); // Generates unique ID
    },
  },

  
  firstName: String,
  lastName: String,
  course: String,
  block: String,
  yearlevel: String,
  gender: String,
  personalQuote: String,
  profilePicture: String,
});

const CollegeStudent = mongoose.model("CollegeStudent", studentSchema, "college_students");
module.exports = CollegeStudent;


