import { Router } from "express";
import adminRouter from "./adminRoutes.js";

const v1Router = Router();

v1Router.use('/admin' , adminRouter);

export default v1Router;