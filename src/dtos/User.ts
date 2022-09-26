import { Document } from "mongoose";

export interface IUser extends Document{
   name:string;
   email:string; 
   password:string
   createAt: Date;
}


export interface IUserRequest{
    name:string;
    email:string; 
    password:string
}

export interface IUserUpdateRequest{
    name:string;
    email:string; 
    password:string
}