import {Router} from "express";
import authRouter from "./routes/authRoutes.js";
import roleRouter from "./routes/roleRoutes.js";
const routerv1 = Router();

routerv1.use('/v1',authRouter)
routerv1.use('/v1',roleRouter)


export default routerv1