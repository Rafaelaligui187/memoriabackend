const mongoose = require("mongoose");

const seniorhighStudentSchema = new mongoose.Schema({
  studentID: { type: String, unique: true, required: true }, // Unique student ID
  firstName: String,
  lastName: String,
  personalQuote: String,
  gender: String,
  section: String,
  grade: String,
  strand: String,
  profilePicture: String
});

// Export model with "senior_students" collection name
module.exports = mongoose.model("SeniorhighStudent", seniorhighStudentSchema, "seniorhigh_students");
