const mongoose = require("mongoose");

const elementaryStudentSchema = new mongoose.Schema({
  studentID: { type: String, unique: true, required: true }, // Unique student ID
  firstName: String,
  lastName: String,
  personalQuote: String,
  gender: String,
  section: String,
  grade: String,
  profilePicture: String
});

// Export model with "elementary_students" collection name
module.exports = mongoose.model("ElementaryStudent", elementaryStudentSchema, "elementary_students");
