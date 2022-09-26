import { model, Schema } from "mongoose";
import { IUser, UserDocument } from "../dtos/User";
import validator from 'validator'
import { hashSync, compareSync } from 'bcrypt'

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



UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await hashSync(this.password, 10);
        return next();
    } catch(err) {
        return next(err as Error)
    }
})

UserSchema.methods.validatePassword = function(password: string) {
    return compareSync(password, this.password);
}

export default model<UserDocument>('User', UserSchema);