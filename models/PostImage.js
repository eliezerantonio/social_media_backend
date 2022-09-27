const mongoose = require("mongoose");

const PostImageSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    path: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now(),
    }

});
module.exports = mongoose.model("PostImages", PostImageSchema);