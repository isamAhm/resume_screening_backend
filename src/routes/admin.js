const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_controller')

router.post("/create-posts", controller.createPost);
router.patch("/update-post/:id", controller.updatePost);
router.delete("/delete-post/:id", controller.deletePost);
router.get("/get-all-posts", controller.getAllPosts);
router.get("/get-ranked-application/:id", controller.getRankedApplication);





// Export the router
module.exports = router;
