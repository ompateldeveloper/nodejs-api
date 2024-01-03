import {Router} from "express";
import responseFormatterMiddleware from "./v1/middlewares/responseFormatterMiddleware.js";
import routerv1 from "./v1/router-v1.js";
const router = Router();
router.use(responseFormatterMiddleware)
router.use('/api',routerv1)

export default router
