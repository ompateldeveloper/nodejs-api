import Role from '../models/Role.js';

const RoleController = {
    createRole: async (req, res) => {
        try {
            const newRole = await Role.create(req.body);
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getRoles: async (req, res) => {
        try {
            const roles = await Role.find();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default RoleController;
