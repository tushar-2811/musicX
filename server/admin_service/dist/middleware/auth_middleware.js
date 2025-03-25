import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                status: false,
                message: "Please Sign In"
            });
            return;
        }
        const { data } = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/user/my-profile`, {
            headers: {
                token
            }
        });
        if (!data.status) {
            return data;
        }
        req.user = data.data.user;
    }
    catch (error) {
        res.status(403).json({
            status: false,
            message: "Please Sign In"
        });
    }
};
