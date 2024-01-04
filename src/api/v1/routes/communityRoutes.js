import { Router } from "express";
import CommunityController from "../controllers/communityController.js";
const communityRouter = Router()

communityRouter.post('/',CommunityController.createCommunity) // Create
communityRouter.get('/',CommunityController.getCommunities) // Get All
communityRouter.get('/:id/members',CommunityController.getMembers) //Get All Members
communityRouter.get('/me/owner',CommunityController.getMeOwner) //GEt My Owned COmmunity
communityRouter.get('/me/member',CommunityController.getMeMember) //Getmy Joined Community


export default communityRouter