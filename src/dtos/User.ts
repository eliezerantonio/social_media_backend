import { Document } from "mongoose";
import User from "../entities/User";
export interface User {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
}
export interface IUser extends Document{
   name:string;
   email:string; 
   password:string;
   createAt: Date;
}


export interface IUserRequest{
    name:string;
    email:string; 
    password:string;
}

export interface IUserUpdateRequest{
    name:string;
    email:string; 
    password:string;
}

export interface IUser {
    email: string;
    name: string;
    id: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserData {
    email: string;
    name: string;
    id: string;
    token: string;
}


export interface normalizeUser {
    email: string;
    name: string;
    id: string;
    password?: string;
    token: string;
}


export interface UserDocument extends User, Document {
    validatePassword(param: string): Promise<boolean>;
}

