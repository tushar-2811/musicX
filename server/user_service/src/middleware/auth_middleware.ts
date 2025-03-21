import { Request , Response ,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User,IUser } from "../models/user.model.js";


export interface AuthenticatedRequest extends Request {
    user? : IUser | null
}

export const AuthMiddleware = async(req:AuthenticatedRequest , res:Response , next : NextFunction) : Promise<void> => {
      try {
        const token = req.headers.token as string;
       
        if(!token){
            res.status(403).json({
                status : "false",
                message : "Please Sign In"
            });
            return;
        }
   
        const decodedData = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;

        if(!decodedData || !decodedData._id){
            res.status(403).json({
                status : false,
                message : "Invalid Token"
            });
            return;
        }

        const userId = decodedData._id;

        const existingUser = await User.findById(userId).select("-password");

        if(!existingUser){
            res.status(403).json({
                status : false,
                message : "User Not Found"
            });
            return;
        }

        req.user = existingUser;
        next();

      } catch (error) {
        res.status(403).json({
           status : false,
           message : "Please Sign In"
        })
      }
}