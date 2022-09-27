const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  pics: {
    type: Array,
    trim: true,
  },
  description: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Post", PostSchema);
