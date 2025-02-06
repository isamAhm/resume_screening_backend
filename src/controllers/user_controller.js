const JobPost = require("../models/jobPost");
const Application = require("../models/application");
const path = require("path");
const fs = require("fs"); // F

exports.getAllPosts = async (req, res) => {
  try {
    // Retrieve all JobPost documents from the database
    const posts = await JobPost.find().populate("applications");

    // Send the retrieved posts as the response
    res.status(200).json({
      success: true,
      data: posts,
      message: "All posts retrieved successfully",
    });
  } catch (error) {
    // Handle any errors that occur during retrieval
    console.error("Error retrieving posts:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
};

exports.createApplication = async (req, res) => {
  console.log("entered");
  const { id } = req.params; // Job post ID
  console.log("idd:", id);
  const { filledData, userIdentifier } = req.body; // Form data and user identifier
  const resume = req.file; // Assuming you use something like 'multer' to handle the file upload
  const parsedFilledData = JSON.parse(filledData);
  console.log("filledData", filledData);
  console.log("userIdentifier", userIdentifier);

  try {
    const jobPost = await JobPost.findById(id);
    if (!jobPost) {
      return res
        .status(404)
        .json({ success: false, message: "Job post not found" });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({
      jobPost: id,
      userIdentifier,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "User has already applied to this job post",
      });
    }

    // Check if a resume file is uploaded
    let resumePath = null;
    if (resume) {
      // Save the file path to the database (e.g., in a 'uploads' directory)
      const resumeName = `${userIdentifier}_resume_${Date.now()}${path.extname(
        resume.originalname
      )}`;
      const resumeDestination = path.join(
        __dirname,
        "..",
        "uploads",
        resumeName
      );

      // Move the file to the desired location (use fs or multer to handle this part)
      fs.renameSync(resume.path, resumeDestination); // Moving file to 'uploads' folder

      // Store the file path in the database
      resumePath = resumeDestination;
    } else {
      return res.status(400).json({
        success: false,
        message: "resume not uploaded",
      });
    }

    // Create a new application
    const application = await Application.create({
      jobPost: id,
      filledData: parsedFilledData,
      userIdentifier,
      resume: resumePath, // Store file path if uploaded
    });

    // Add application to the job post
    jobPost.applications.push(application._id);
    await jobPost.save();

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error while applying:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
