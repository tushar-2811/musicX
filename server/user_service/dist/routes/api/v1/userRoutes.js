import { Router } from "express";
import { registerUser } from "../../../controllers/user_controller.js";
const userRouter = Router();
userRouter.post('/sign-up', registerUser);
export default userRouter;
