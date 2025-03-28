import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    email : string;
    name : string;
    password : string;
    role : string;
    playlist : string[];
}

const userSchema:Schema<IUser> = new Schema({
      name : {
        type : String,
        required : true
      },
      email : {
        type : String,
        required : true,
        unique : true
      },
      password : {
        type : String,
        required : true
      },
      role : {
        type : String,
        default : "user"
      },
      playlist : [
        {
            type : String,
            required : true
        }
      ]

},{timestamps : true});


export const User = mongoose.model<IUser>("User" , userSchema);