import { Router } from "express";
import RoleController from "../controllers/roleController.js";

const roleRouter = Router()

roleRouter.post('/',RoleController.createRole)
roleRouter.get('/',RoleController.getRoles)

export default roleRouter