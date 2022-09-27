import { Schema } from "mongoose";

export interface ICreatePostDTO{
 
    files: [],
    description: string;
    likes: number;
    creator: Schema.Types.ObjectId,
    createdAt:  Date,

}