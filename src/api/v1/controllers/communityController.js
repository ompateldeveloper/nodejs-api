import Community from '../models/Community.js';
import Member from '../models/Member.js';
import paginate from '../utils/pagination.js';
import Validator from "validatorjs";
import generateSlug from '../utils/generateSlug.js';
import Role from '../models/Role.js';
const CommunityController = {
    createCommunity: async (req, res) => {
        try {

            const data = {
                name: req.body.name,
                slug: generateSlug(req.body.name),
                owner: req.user.id
            }
            
            const validation = new Validator(data, {
                name: 'required|min:2',
                owner: 'required'
            });

            if (validation.fails()) return res.apiError(validation.errors.all());

            const exists = await Community.findOne({name:req.body.name});
            if(exists) return res.apiError('ALREADY_EXISTS');

            const newCommunity = (await Community.create(data));
            delete newCommunity?._id;
            const {id:roleId} = await Role.findOne({name:"Community Admin"});
            console.log(roleId);
            const joincommunity = await Member.create({
                community:newCommunity.id,
                user:req.user.id,
                role: roleId
            });
            res.apiCreated({data:newCommunity});
        } catch (error) {
            res.apiError(error);
        }
    },

    getCommunities: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 10;
            const totalItems = await Community.countDocuments();
            const totalPages = Math.ceil(totalItems / pageSize);
    
            const communities = await Community.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize);
    
            const meta = {
                total: totalItems,
                pages: totalPages,
                page: page,
            };          
            return res.apiSuccess({ meta, data: communities });
        } catch (error) {
            res.apiError(error);
        }
    },

    getMembers: async (req, res) => {
        try {
            const communityId = req.params.id;
            const exist = await Community.findOne({id:communityId})
            if(!exist) return res.apiError('COMMUNITY_NOT_EXIST') 
            const members = await Member.find({community:communityId})
            res.apiSuccess({data:members});
        } catch (error) {
            res.apiError(error);
        }
    },

    getMeOwner: async (req, res) => {
        try {
            const ownerId = req.user.id;
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 10;

            const { paginationInfo, items: communities } = await paginate(Community, page, pageSize,{owner:ownerId});
            res.apiSuccess({meta:paginationInfo,data:communities});
        } catch (error) {
            res.apiError(error);
        }
    },

    getMeMember: async (req, res) => {
        try {
            const userId = req.user.id;
            const memberof = await Member.find({user:userId});
            const communities = memberof.map(member => member.community);
            
            const joinedCommunities = await Community.find({ id: { $in: communities } });
            const filteredCommunities = joinedCommunities.filter((community)=>{community.owner!==userId})
            res.apiSuccess({data:filteredCommunities});
        } catch (error) {
            res.apiError(error);
        }
    },
};

export default CommunityController;
