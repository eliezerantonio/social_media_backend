//rotas para criar usuarios
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload_middleware");
const { check } = require("express-validator");


// router.get("/:id", auth, commentController.findById);
router.get("/:postId", auth, commentController.findAllByPostComments);

router.post("/",auth,[check("description", "Descricao deve ser no minimo de 1 caracter").isLength({min: 1,}),],commentController.createComment);

router.patch("/:id",auth,[check("description", "Descricao deve ser no minimo de 1 caracter").isLength({min: 1,}),], commentController.updateComment
);

router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
