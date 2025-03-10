const express = require("express");
const multer = require("multer");
const fs = require("fs");
const SeniorhighStudent = require("../models/seniorhighStudent");

const router = express.Router();

// Create a new elementary student
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, gender, grade, section, strand, personalQuote, profilePicture } = req.body;

    if (!firstName || !lastName || !gender || !grade || !section || !profilePicture) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate unique studentID (random 8-character alphanumeric string)
    const studentID = Math.random().toString(36).substring(2, 10).toUpperCase();

    const newStudent = new SeniorhighStudent({
      studentID,
      firstName,
      lastName,
      gender,
      grade,
      strand,
      section,
      personalQuote,
      profilePicture
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all elementary students
router.get("/", async (req, res) => {
  try {
    const students = await SeniorhighStudent.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single elementary student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await SeniorhighStudent.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an elementary student
router.delete("/:id", async (req, res) => {
  try {
    const student = await SeniorhighStudent.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    await SeniorhighStudent.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
