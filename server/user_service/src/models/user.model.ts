import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
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
        required : true
      },
      playlist : [
        {
            type : String,
            required : true
        }
      ]

},{timestamps : true});


export const User = mongoose.model<IUser>("User" , userSchema);