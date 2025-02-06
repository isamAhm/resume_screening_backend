const axios = require("axios");

async function processResumes(resumes, jobDescription, requiredExperience) {
  try {
    // Call the Flask ML service
    const response = await axios.post("http://127.0.0.1:5000/process-resume", {
      resumes,
      job_description: jobDescription,
      required_experience: requiredExperience,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error communicating with the ML server:", error.message);

    // error handling for debugging
    if (error.response) {
      // Server responded with a status other than 2
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      // No response received from the server
      console.error("No response received:", error.request);
    } else {
      // Some other error occurred
      console.error("Error details:", error.message);
    }

    throw new Error("Failed to process resumes. Please try again later.");
  }
}

module.exports = { processResumes };
