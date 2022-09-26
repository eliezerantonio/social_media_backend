import { model, Schema } from "mongoose";
import { IUser } from "../dtos/User";

const UserSchema :Schema= new Schema({

    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model<IUser>('User', UserSchema);