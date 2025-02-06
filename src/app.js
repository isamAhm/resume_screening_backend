const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { validationResult } = require("express-validator");
const { adminAuthCheck } = require("./middleware/adminAuthCheck");

// Import routes
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const adminAuthRoute = require("./routes/adminAuthRoute");
const resumeRouter = require("./routes/resume"); // Import resume route

const port = 3000;

// Middleware for CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all HTTP methods
    credentials: true,
  })
);

// Validation middleware
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(validationMiddleware); // Your express-validator middleware

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes
app.use("/admin", adminAuthCheck, adminRouter);
app.use("/users", userRouter);
app.use("/admin-auth", adminAuthRoute);
app.use("/api/resumes", resumeRouter); // Add resume routes

// Set up mongoose connection
const mongoDB = "mongodb://localhost:27017/resume_screening_db";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
