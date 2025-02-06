const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_controller");
const upload = require("../middleware/file_upload_config");

// GET all post
router.get("/get-all-posts", controller.getAllPosts);
router.post(
  "/apply/:id",
  upload.single("resume"),
  controller.createApplication
);

// Export the router
module.exports = router;
