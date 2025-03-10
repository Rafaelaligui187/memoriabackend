const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Student = require("../models/Student");


const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Create a new student
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, gender, block, yearlevel, personalQuote, course, profilePicture } = req.body;

    if (!firstName || !lastName || !gender || !yearlevel || !block || !course || !profilePicture) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate unique studentID (random 8-character alphanumeric string)
    const studentID = Math.random().toString(36).substring(2, 10).toUpperCase();

    const newStudent = new Student({
      studentID,
      firstName,
      lastName,
      course,
      block,
      gender,
      yearlevel,
      personalQuote,
      profilePicture
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student and their Cloudinary image
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Just delete the student record (can't remove ImgBB images)
    await Student.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
