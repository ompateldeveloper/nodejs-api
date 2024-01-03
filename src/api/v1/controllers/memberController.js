import Member from '../models/Member.js';

const MemberController = {
    createMember: async (req, res) => {
        try {
            const newMember = await Member.create(req.body);
            res.status(201).json(newMember);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getMembers: async (req, res) => {
        try {
            const members = await Member.find();
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default MemberController;
