const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentID: { type: String, unique: true, required: true }, // Add studentID
  firstName: String,
  lastName: String,
  personalQuote: String,
  gender: String,
  block: String,
  yearlevel: String,
  course: String,
  profilePicture: String
});

// Export model with "college_students" collection name
module.exports = mongoose.model("Student", studentSchema, "college_students");
