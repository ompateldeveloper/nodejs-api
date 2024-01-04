import { Router } from "express";
import RoleController from "../controllers/roleController.js";

const roleRouter = Router()

roleRouter.post('/role',RoleController.createRole)
roleRouter.get('/role',RoleController.getRoles)

export default roleRouter