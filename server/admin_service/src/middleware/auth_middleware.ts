import { NextFunction,Request,Response } from "express";
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();

interface Iuser{
    _id : string;
    name : string;
    email : string;
    password : string;
    role : string;
    playlist : string[];
}

interface AuthenticatedRequest extends Request{
     user ?: Iuser | null
}

export const isAuth = async(req: AuthenticatedRequest , res: Response , next: NextFunction) : Promise<void> => {
    try {
        const token = req.headers.token as string;

        if(!token){
            res.status(403).json({
                status : false,
                message : "Please Sign In"
            });
            return;
        }

        const {data} = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/user/my-profile`,{
            headers : {
                token
            }
        });

        if(!data.status){
            return data;
        }

        req.user = data.data.user;


    } catch (error) {
        res.status(403).json({
            status : false,
            message : "Please Sign In"
        })
    }
}
