import {Router} from "express";
import authRouter from "./routes/authRoutes.js";
const routerv1 = Router();

routerv1.use('/v1',authRouter)


export default routerv1