import { Router } from "express";
import { registerUserController, signInController } from "../../../controllers/user_controller.js";
const userRouter = Router();
userRouter.post('/sign-up', registerUserController);
userRouter.post('/sign-in', signInController);
export default userRouter;
