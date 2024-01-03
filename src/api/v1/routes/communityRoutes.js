import { Router } from "express";
import { getAll, getOne, addOne, deleteOne,updateOne } from "../controllers/communityController.js";

const musicRouter = Router()

musicRouter.get("/",getAll)
musicRouter.get("/:item",getOne)
musicRouter.post("/",addOne)
musicRouter.put("/:item",updateOne)
musicRouter.delete("/:item",deleteOne)

export default musicRouter