const express = require("express");
const https = require("https");
const fs = require("fs");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const attendanceRoutes = require("./routes/attendance");
const cors = require("cors");
const app = express();

// CORS configuration for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

connectDB();



app.use("/user", userRoutes);

app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5002;

// For development, use HTTP
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on HTTP port ${PORT}`);
  });
} else {
  // For production, try HTTPS if certificates exist, otherwise fallback to HTTP
  try {
    const options = {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert')
    };
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server running on HTTPS port ${PORT}`);
    });
  } catch (error) {
    console.log('SSL certificates not found, falling back to HTTP');
    app.listen(PORT, () => {
      console.log(`Server running on HTTP port ${PORT}`);
    });
  }
}