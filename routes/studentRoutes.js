const express = require("express");
const multer = require("multer");
const fs = require("fs"); // ✅ Import fs to delete temp files
const Student = require("../models/Student");
const { uploadFile } = require("../utils/googleDrive");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage

// ✅ Create a new student (with profile picture upload)
router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const { firstName, lastName, course } = req.body;
    let profilePicture = "";

    if (req.file) {
      profilePicture = await uploadFile(req.file.path, req.file.originalname);

      // ✅ Delete the temporary file after upload
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }

    const newStudent = new Student({ firstName, lastName, course, profilePicture });
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
