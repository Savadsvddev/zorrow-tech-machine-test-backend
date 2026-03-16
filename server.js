const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const attendanceRoutes = require("./routes/attendance");
const cors = require("cors");
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['https://machine-test-46677.web.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/user", userRoutes);
app.use("/attendance", attendanceRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});