const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes"); // Import routes
const elementarystudentRoutes = require("./routes/elementarystudentRoutes"); // Import routes
const highschoolstudentRoutes = require("./routes/highschoolstudentRoutes"); // Import routes
const seniorhighstudentRoutes = require("./routes/seniorhighstudentRoutes"); // Import routes


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.use("/api/college_students", studentRoutes); // ✅ Add the student routes
app.use("/api/elementary_students", elementarystudentRoutes); // ✅ Add the student routes
app.use("/api/highschool_students", highschoolstudentRoutes); // ✅ Add the student routes
app.use("/api/seniorhigh_students", seniorhighstudentRoutes); // ✅ Add the student routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
