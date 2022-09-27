//rotas para criar usuarios
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload_middleware");
const { check } = require("express-validator");
//criar usuarios

router.get("/", auth, postController.findAllPosts);
router.post("/", auth, postController.createPost);
router.patch("/:id", auth, postController.updatePost);
router.patch("/like/:id", auth, postController.likePost);
router.patch("/unlike/:id", auth, postController.unlikePost);
router.delete("/:id", auth, postController.deletePost);

router.post("/images", auth, postController.createPostImages);
router.get("/images/:postId", auth, postController.findAllImagesPost);

module.exports = router;
