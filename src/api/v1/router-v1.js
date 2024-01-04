import {Router} from "express";
import authMiddleware from "./middlewares/authMiddleware.js";

import authRouter from "./routes/authRoutes.js";
import roleRouter from "./routes/roleRoutes.js";
import communityRouter from "./routes/communityRoutes.js";
import memberRouter from "./routes/memberRoutes.js";
const routerv1 = Router();

routerv1.use('/v1/auth',authRouter)
routerv1.use('/v1/role',roleRouter)
routerv1.use('/v1/community',authMiddleware,communityRouter)
routerv1.use('/v1/member',authMiddleware,memberRouter)


export default routerv1