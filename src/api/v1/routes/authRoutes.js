import { Router } from "express";
import AuthController from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
const authRouter = Router()

authRouter.post("/signup",AuthController.signup)
authRouter.post("/signin",AuthController.signin)   
authRouter.get("/me",authMiddleware,AuthController.getMe)   


export default authRouter