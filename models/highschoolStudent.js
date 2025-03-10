const mongoose = require("mongoose");

const highschoolStudentSchema = new mongoose.Schema({
  studentID: { type: String, unique: true, required: true }, // Unique student ID
  firstName: String,
  lastName: String,
  personalQuote: String,
  gender: String,
  section: String,
  grade: String,
  profilePicture: String
});

// Export model with "highschool_students" collection name
module.exports = mongoose.model("HighschoolStudent", highschoolStudentSchema, "highschool_students");
