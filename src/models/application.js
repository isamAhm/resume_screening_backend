const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  jobPost: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost", required: true }, // Link to JobPost
  filledData: [
    {
      fieldName: { type: String, required: true }, // Name of the form field
      value: { type: Schema.Types.Mixed, required: true }, // Value entered by the applicant
    },
  ],
  userIdentifier: { type: String, required: true }, // Unique identifier for the user
  resume: { type: String }, // Path to the uploaded resume

});

// Export model
module.exports = mongoose.model("Application", ApplicationSchema);
