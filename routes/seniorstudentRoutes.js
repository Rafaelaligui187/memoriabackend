const express = require("express");
const multer = require("multer");
const fs = require("fs");
const SeniorhighStudent = require("../models/seniorhighStudent");
const { uploadFile } = require("../utils/googleDrive");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const { firstName, lastName, gender, grade, strand, section, personalQuote } = req.body;
    let profilePicture = "";

    if (req.file) {
      profilePicture = await uploadFile(req.file.path, req.file.originalname);
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }

    const newStudent = new SeniorhighStudent({
      firstName,
      lastName,
      gender,
      grade,
      strand,
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
    const seniorhighstudents = await SeniorhighStudent.find();
    res.json(seniorhighstudents); // ✅ FIXED (was incorrectly using `students`)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await SeniorhighStudent.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await SeniorhighStudent.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
