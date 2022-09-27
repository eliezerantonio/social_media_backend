import { Schema, model } from "mongoose";
import { PostDocument } from "../dtos/Post";


const PostSchema = new Schema<PostDocument> ({
    
    files: {
        type: Array,
    },
    
    description: {
        type: String,
    },
    
    likes: {
        type: Number,
        default: 0,
    },
    
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

export default  model("Post", PostSchema); 