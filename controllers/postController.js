const Post = require("../models/Post");
const User = require("../models/User");
const PostImage = require("../models/PostImage");

const { cloudinary } = require('../providers/CloudinaryService');

const { validationResult } = require("express-validator");


//* POST - CREATE NEW POST *//
exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const { id } = req.user;
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exists!" });
    }
    
    //* create Post *//
    const post = new Post(req.body);
    post.creator = id;    
    post.save();

  
    
    res.json({ post });
  } catch (error) {
    res.status(500).send("Error: "+error);
  }
};


//* GET - GET ALL POSTS *//
exports.findAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    const result = {
      "length": posts.length, 
      "posts": posts
    } 
    res.json(result);

  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

//* PUT - UPDATE AN POST *//
exports.updatePost = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { description } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  try {

    const postExists = await Post.findById(id);
  
    if (!postExists) {
      return res.status(404).json({ message: "Post doesn't exists" });
    }

      if (postExists.creator.toString() !== userId) {
        return res.status(401).json({ message: "User Unauthorized" });
      }


      const post = await Post.findOneAndUpdate(
        { _id: id },
        { $set: { description } },
        { new: true }
      );
      res.json({ post });

    
    } catch (error) {
      res.status(500).send("Error: "+ error);
    }
  
};

//* Add - Like an post *//
exports.likePost = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { likers }  = req.body;
  const { id }      = req.params;


  try {

    const postExists = await Post.findById(id);
    
    if (!postExists) {
      return res.status(404).json({ message: "Post doesn't exists" });
    }
    //* checkout if like exists *//
    if (postExists.likers.includes(likers)) {
      return res.status(401).json({ message: "Like already exists!" });
    }
    
    const data = await Post.findOneAndUpdate(
      { _id: id },
      { $push: {likers} },
      { new: true }
    );

    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { likes: (data.likes += 1) } },
      { new: true }
    );

    res.json({ post });

 
  } catch (error) {
    res.status(500).send("Error: "+ error);
  }
};


//* Remove - Unlike an post  *//
exports.unlikePost = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { likers }  = req.body;
  const { id }      = req.params;

  try {

    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(404).json({ message: "Post doesn't exists" });
    }

    if (!postExists.likers.includes(likers)) {
      return res.status(401).json({ message: "Like doesn't exists" });
    }

    if (likers) {
      likers = likers.filter((like) => like !== likers);
    }

    const data = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { likers } },
      { new: true }
    );

    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { likes: (data.likes -= 1) } },
      { new: true }
    );

    res.json({ post });

  

  } catch (error) {
    res.status(500).send("Error: "+error);
  }

}

//* DELETE - DELETE POST *//
exports.deletePost = async (req, res) => {

  try {
    const { id } = req.params;
    const userId = req.user.id;

    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(404).json({ message: "Post doesn't exists" });
    }


    if (postExists.creator.toString() !== userId) {
      return res.status(401).json({ msg: "User unauthorized" });
    }

    
    await Post.findOneAndRemove({ _id: id });
    
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exists" });
    }
    userExists.posts -= 1;

    await User.findOneAndUpdate(
      { _id: userId },
      { $set: userExists },
      { new: true }
    );
    res.json({ message: "Post deleted with successful" });

  } catch (error) {
    res.status(500).send("Error: "+ error);
  }
};


//* POST - Add an Image  *//
exports.createPostImages = async (req, res, next) => {
  
  try {

    if (req.files) {
      let path = "";
      const { postId } = req.body;
      const { photo }   = req.files;


      const postExists = await Post.findById(postId);
      if (!postExists) {
        return res.status(404).json({ message: "Post doesn't exists" });
      }

      await cloudinary.uploader.upload(photo.tempFilePath, (err, result) => {
        if (err) {
          return res.status(404).json({ message: "Error uploading: "+err });
        }
        path += result.url;
      });

      const postImage = new PostImage({ postId, path });

      postImage.save();
      
      res.json(postImage);
    }

  } catch (error) {
    res.status(500).send("Error: "+error);
  }
};

//* GET -  GET ALL Images on post *//
exports.findAllImagesPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post doesn't exists" });
    }
    
    const images = await PostImage.find({ postId: postId });

    res.json({ images });

  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};