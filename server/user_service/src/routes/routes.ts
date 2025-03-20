import { Router } from "express";
import apiRouter from "./api/apiRoutes.js";

const indexRouter = Router();

indexRouter.use('/api' , apiRouter);


export default indexRouter;