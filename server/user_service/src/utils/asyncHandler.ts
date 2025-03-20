import { NextFunction, Request, RequestHandler, Response } from "express";

const AsyncHandler = (handler:RequestHandler) : RequestHandler => {
     return async (req:Request , res:Response , next:NextFunction) => {
        try {
            await handler(req,res,next);
        } catch (error: any) {
             res.status(500).json({
                status : false,
                message : error.message
            })
        }
     }
}

export default AsyncHandler;