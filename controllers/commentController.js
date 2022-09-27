const Comment = require("../models/Comment");

const { validationResult } = require("express-validator");

exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //criar comentario
    const comment = new Comment(req.body);
    comment.userId = req.user.id;
    comment.username = req.user.name;
    comment.pic = req.user.pic;

    comment.save();

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error do servidor");
  }
};

exports.findAllByPostComments = async (req, res) => {
  const { post } = req.body;
  try {
    const comments = await Comment.find({ post });
    res.json({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro");
  }
};

exports.updateComment = async (req, res) => {
  try {
    //verificar erros

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description } = req.body;

    const newComment = {};

    if (description) {
      newComment.description = description;
    }

    let comment = Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ mag: "comentario n econtrado" });
    }

    // if (comment.userId.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "N autorizado" });
    // }

    //atualizar
    comment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: newComment },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error no servidor");
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ mag: "Comentario n econtrado" });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "N autorizado" });
    }

    //eliminar
    await Comment.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Comentario eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error no servidor");
  }
};
