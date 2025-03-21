import { Router } from "express";
import {  myProfileController, registerUserController, signInController } from "../../../controllers/user_controller.js";
import { AuthMiddleware } from "../../../middleware/auth_middleware.js";

const userRouter = Router();

userRouter.post('/sign-up',registerUserController);
userRouter.post('/sign-in',signInController);

userRouter.get('/my-profile', AuthMiddleware ,myProfileController);

export default userRouter;