const express = require("express");
const router = express.Router();
const upload = require("../middleware/file_upload_config");
const fs = require("fs");
const { processResumes } = require("../controllers/ml_service"); // Use ml_service.js

// Route for uploading and analyzing resumes
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the uploaded file
    const resumeFilePath = req.file.path;
    const resumeFileContent = fs.readFileSync(resumeFilePath, "utf8");

    // Prepare the inputs for the ML service
    const resumes = [resumeFileContent];
    const { jobDescription, requiredExperience } = req.body;

    // Call the centralized ML service controller
    const flaskResponse = await processResumes(
      resumes,
      jobDescription,
      requiredExperience
    );

    // Send the response to the client
    res.status(200).json(flaskResponse);
  } catch (error) {
    console.error("Error processing resume:", error.message);
    res.status(500).json({ error: "Error processing resume" });
  }
});

module.exports = router;
