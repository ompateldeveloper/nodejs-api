import { Router } from "express";
import AuthController from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
const authRouter = Router()

authRouter.post("/auth/signup",AuthController.signup)
authRouter.post("/auth/signin",AuthController.signin)   
authRouter.get("/auth/me",authMiddleware,AuthController.getMe)   


export default authRouter