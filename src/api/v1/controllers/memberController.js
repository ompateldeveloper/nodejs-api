import Validator from 'validatorjs';
import Community from '../models/Community.js';
import Member from '../models/Member.js';
import Role from '../models/Role.js';
import User from '../models/User.js';

const MemberController = {
    createMember: async (req, res) => {
        try {
            const data = {
                community:req.body.community,
                user:req.body.user,
                role:req.body.role
            }

            // empty fields validation
            const validation = new Validator(data, {
                community:'required',
                user:'required',
                role:'required'
            });
            if (validation.fails()) {
                return res.apiError(validation.errors.all());
            }

            //some corner cases and validations
            const exists = await Member.findOne({...data})
            if(exists) return res.apiError('USER_ALREADY_IN_COMMUNITY')
            const community = await Community.findOne({id:data.community})
            if(!community) return res.apiError('COMMUNITY_NOT_EXIST')
            const user = await User.findOne({id:data.user})
            if(!user) return res.apiError('USER_NOT_EXIST')
            const role = await Role.findOne({id:data.role});
            if(!role) return res.apiError('ROLE_NOT_EXIST')

            //checking if user is admin or not
            const isCommunityAdmin = community.owner===req.user.id;
            if (isCommunityAdmin) {
                const newMember = await Member.create(data);
                res.apiCreated({data:newMember});
            } else {
                res.apiError('NOT_ALLOWED_ACCESS', 403);
            }
        } catch (error) {
            res.apiError( error );
        }
    },

    deleteMember: async (req, res) => {
        try {
            const validation = new Validator(req.body, {
                community:'required',
                id:'required'
            });
            if (validation.fails()) {
                return res.apiError(validation.errors.all());
            }
            const role = await Role.find({});
            //go to member table find req.user using his id and community id ,now check his role and see if his role.name matches Community Admin or Coounity Moderator if not throw error
            const member = await Member.findOne({user:req.user.id,community:req.body.community})
            const userRole = await Role.findOne({ id: member.role });
            if(userRole && (userRole.name===("Community Admin"||"Community Moderator"))){
                const deletedMember = await Member.deleteOne({user:req.body.id,community:req.body.community});
                res.apiSuccess({data:deletedMember});
            } else {
                return res.apiError('NOT_ALLOWED_ACCESS')
            }
        } catch (error) {
            res.apiError( error );
        }
    },
};

export default MemberController;
