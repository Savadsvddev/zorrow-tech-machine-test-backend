const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const attendanceRoutes = require("./routes/attendance");
const cors = require("cors")
const path = require("path");
const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", userRoutes);
app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT ||5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});