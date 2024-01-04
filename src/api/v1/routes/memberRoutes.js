import { Router } from "express";
import MemberController from "../controllers/memberController.js";

const memberRouter = Router()
memberRouter.post('/',MemberController.createMember)
memberRouter.delete('/',MemberController.deleteMember)

export default memberRouter;