const mongoose = require("mongoose");

const elementarystudentSchema = new mongoose.Schema({
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

const ElementaryStudent = mongoose.model("ElementaryStudent", elementarystudentSchema, "elementary_students");
module.exports = ElementaryStudent;

