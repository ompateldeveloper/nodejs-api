import Role from '../models/Role.js';
import paginate from '../utils/pagination.js';
import Validator from "validatorjs"
const RoleController = {
    createRole: async (req, res) => {
        try {
            const validation = new Validator(req.body, {
                name: 'required|min:2',
            });
            if (validation.fails()) {
                return res.apiError(validation.errors.all());
            }
            
            const exists = await Role.findOne({name:req.body.name})
            if(exists) return res.apiError('Already_Exists')

            const newRole = await Role.create(req.body);
            console.log(newRole);
            res.apiCreated({data:newRole.toObject()});
        } catch (error) {
            res.apiError(error);
        }
    },

    getRoles: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const pageSize = req.query.pageSize || 10;
            const { paginationInfo, items: roles } = await paginate(Role, page, pageSize);
            res.apiSuccess({ meta: paginationInfo, data: roles });
        } catch (error) {
            res.apiError(error);
        }
    },
};

export default RoleController;
