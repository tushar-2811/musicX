import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
export const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                status: "false",
                message: "Please Sign In"
            });
            return;
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData || !decodedData._id) {
            res.status(403).json({
                status: false,
                message: "Invalid Token"
            });
            return;
        }
        const userId = decodedData._id;
        const existingUser = await User.findById(userId).select("-password");
        if (!existingUser) {
            res.status(403).json({
                status: false,
                message: "User Not Found"
            });
            return;
        }
        req.user = existingUser;
        next();
    }
    catch (error) {
        res.status(403).json({
            status: false,
            message: "Please Sign In"
        });
    }
};
