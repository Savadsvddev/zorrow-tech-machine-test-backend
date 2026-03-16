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

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// Manual CORS headers as backup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://machine-test-46677.web.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

connectDB();

app.use("/user", userRoutes);
app.use("/attendance", attendanceRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});