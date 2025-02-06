const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the directory where you want to store uploaded resumes
const uploadDirectory = path.join(__dirname, "..", "uploads"); // This assumes you're in the 'src/middleware' folder

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); // Create the 'uploads/resumes' folder
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store the uploaded file in the 'uploads' folder
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    // Use a timestamp to avoid filename conflicts
    cb(
      null,
      `${req.body.userIdentifier}_resume_${Date.now()}_${file.originalname}`
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
