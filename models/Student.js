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
  profilePicture: String
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
