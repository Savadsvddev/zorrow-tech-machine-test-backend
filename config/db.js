const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!"mongodb+srv://savadsvd088:JQKnRJkQglQhPVxC@cluster0.2ts20gv.mongodb.net/?appName=Cluster0") {
      console.error("MONGO_URI is not defined in environment variables");
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI:", "mongodb+srv://savadsvd088:JQKnRJkQglQhPVxC@cluster0.2ts20gv.mongodb.net/?appName=Cluster0" ? "URI is set" : "URI is missing");

    const conn = await mongoose.connect("mongodb+srv://savadsvd088:JQKnRJkQglQhPVxC@cluster0.2ts20gv.mongodb.net/?appName=Cluster0");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.error("Full error:", error);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;