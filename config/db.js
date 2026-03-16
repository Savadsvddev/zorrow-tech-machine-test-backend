const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in environment variables");
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI ? "URI is set" : "URI is missing");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.error("Full error:", error);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;