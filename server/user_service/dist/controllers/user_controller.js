import { User } from "../models/user.model.js";
import { registerSchema } from "../types/user.types.js";
import AsyncHandler from "../utils/asyncHandler.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
export const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const parsedData = registerSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(401).json({
            status: false,
            message: parsedData.error.errors[0].message
        });
        return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({
            status: false,
            message: "User alrady exist"
        });
        return;
    }
    // Now , if no user exist with provided email
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email, name, password: hashedPassword
    });
    const userData = await User.findById(newUser._id).select("-password");
    // create new token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
        status: "true",
        message: "User registered successfully",
        data: {
            token,
            user: userData
        }
    });
});
