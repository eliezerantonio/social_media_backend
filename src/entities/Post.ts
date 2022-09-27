import { Schema, model } from "mongoose";


const PostSchema = new Schema ({
    files: {
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
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

});

export default  model("Post", PostSchema); 