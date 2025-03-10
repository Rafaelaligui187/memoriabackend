const express = require("express");
const multer = require("multer");
const fs = require("fs");
const HighschoolStudent = require("../models/highschoolStudent");
const { uploadFile } = require("../utils/googleDrive");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const { firstName, lastName, gender, grade, section, personalQuote } = req.body;
    let profilePicture = "";

    if (req.file) {
      profilePicture = await uploadFile(req.file.path, req.file.originalname);
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }

    const newStudent = new HighschoolStudent({
      firstName,
      lastName,
      gender,
      grade,
      section,
      personalQuote,
      profilePicture,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const highschoolstudents = await HighschoolStudent.find();
    res.json(highschoolstudents); // ✅ FIXED (was incorrectly using `students`)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await HighschoolStudent.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await HighschoolStudent.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
