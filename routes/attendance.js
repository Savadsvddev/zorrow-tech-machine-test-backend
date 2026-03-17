const express = require("express");
const router = express.Router();
const attendance = require("../models/attendanceModel");
const authMiddleware = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/uploadmiddlewears");
const { default: mongoose } = require("mongoose");



router.post("/checkin", authMiddleware, upload.single("image"),async (req, res) => {
  try {
    const { user_id, latitude, longitude } = req.body;
     const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!user_id || !latitude || !longitude || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

   

    const attendanceRecord = new attendance({
      user_id,
      latitude,
      longitude,
      image,
      timestamp: new Date(),
      Type:"checkin"

    });

    const savedAttendance = await attendanceRecord.save();

    res.status(201).json({
      success: true,
      message: "Check-in successful",
      data: savedAttendance
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/checkout", authMiddleware,upload.single("image"), async (req, res) => {
  try {
    const { user_id, latitude, longitude } = req.body;
     const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!user_id || !latitude || !longitude || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

   

    const attendanceRecord = new attendance({
      user_id,
      latitude,
      longitude,
      image,
      timestamp: new Date(),
      Type:"checkout"
    });

    const savedAttendance = await attendanceRecord.save();

    res.status(201).json({
      success: true,
      message: "Check-out successful",
      data: savedAttendance
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/user/:user_id", authMiddleware, async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Remove any leading colons or extra characters
    const cleanUserId = user_id.replace(/^:/, '');
    console.log("Original user_id:", user_id);
    console.log("Clean user_id:", cleanUserId);
    
    if (!mongoose.Types.ObjectId.isValid(cleanUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format"
      });
    }

    const records = await attendance
      .find({ user_id: new mongoose.Types.ObjectId(cleanUserId) })
      .sort({ timestamp: -1 });

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found"
      });
    }

    res.status(200).json({
      success: true,
      data: records
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;