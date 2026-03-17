const express = require("express");
const router = express.Router();
const attendance = require("../models/attendanceModel");
const authMiddleware = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

router.post("/checkin", authMiddleware, async (req, res) => {
  try {
    const { user_id, latitude, longitude, image } = req.body;

    if (!user_id || !latitude || !longitude || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

   
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileName = Date.now() + "-image.jpg";
    const filePath = path.join("uploads", fileName);

    fs.writeFileSync(filePath, base64Data, "base64");

    const attendanceRecord = new attendance({
      user_id,
      latitude,
      longitude,
      image: filePath,
      timestamp: new Date()
    });

    const savedAttendance = await attendanceRecord.save();

    res.status(201).json({
      success: true,
      message: "Check-in successful",
      data: savedAttendance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/checkout", authMiddleware,async (req, res) => {
  try {
    const { user_id, latitude, longitude, image } = req.body;

    if (!user_id || !latitude || !longitude || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

   
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileName = Date.now() + "-image.jpg";
    const filePath = path.join("uploads", fileName);

    fs.writeFileSync(filePath, base64Data, "base64");

    const attendanceRecord = new attendance({
      user_id,
      latitude,
      longitude,
      image: filePath,
      timestamp: new Date()
    });

    const savedAttendance = await attendanceRecord.save();

    res.status(201).json({
      success: true,
      message: "Check-in successful",
      data: savedAttendance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;