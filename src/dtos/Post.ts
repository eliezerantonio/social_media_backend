import { Schema } from "mongoose";

export interface IPost{
    files: Schema.Types.Array,
    description: string;
    likes: number;
    creator: Schema.Types.ObjectId,
    createdAt:  Date,
       
}

export interface PostDocument extends Document, IPost {}