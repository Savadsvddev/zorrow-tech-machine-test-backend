const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {

    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.error("Database connection failed:", error.message);
    process.exit(1);

  }
};

module.exports = connectDB;