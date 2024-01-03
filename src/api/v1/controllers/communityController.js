import Community from '../models/Community.js';

const CommunityController = {
    createCommunity: async (req, res) => {
        try {
            const newCommunity = await Community.create(req.body);
            res.status(201).json(newCommunity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCommunities: async (req, res) => {
        try {
            const communities = await Community.find();
            res.status(200).json(communities);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default CommunityController;
