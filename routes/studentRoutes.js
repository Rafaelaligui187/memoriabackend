const express = require("express");
const multer = require("multer");
const fs = require("fs");
const CollegeStudent = require("../models/Student");
const { uploadFile } = require("../utils/googleDrive");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory, not locally

// ✅ Create a new student (uploading profile picture to Google Drive)
router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const { firstName, lastName, course, block, yearlevel, gender, personalQuote } = req.body;
    let profilePicture = "";

    if (req.file) {
      // ✅ Upload file directly from memory
      const uploadedUrl = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);

      if (!uploadedUrl) {
        return res.status(500).json({ error: "Failed to upload profile picture" });
      }
      profilePicture = uploadedUrl;
    }

    const newCollegeStudent = new CollegeStudent({
      firstName,
      lastName,
      course,
      block,
      yearlevel,
      gender,
      personalQuote,
      profilePicture,
    });

    await newCollegeStudent.save();
    res.status(201).json(newCollegeStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
