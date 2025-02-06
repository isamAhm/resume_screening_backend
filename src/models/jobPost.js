const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobPost = new Schema(
  {
    title: { type: String, required: true, maxLength: 100 },
    description: { type: String, maxLength: 1000 },
    requiredExperience: { type: Number, maxLength: 100 },
    forms: [
      {
        name: { type: Schema.Types.Mixed, required: true }, // Field name
      },
    ],
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ], // Correctly reference Application
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    }, // Reference to Admin
  },
  { timestamps: true } // This adds createdAt and updatedAt automatically
);

// Export model
module.exports = mongoose.model("JobPost", JobPost);
