import bcrypt from "bcrypt"
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const generateToken = (user) => {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey);
};

const AuthController = {
    signup: async (req, res) => {
        try {
            const exists = await User.findOne({ email: req.body.email });
            if (exists) {
                return res.apiError('ALREADY_EXISTS',409);
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            const userWtPasswd = {...newUser.toObject()}
            delete userWtPasswd.password
            const token = generateToken(newUser);
        
            const payload = {
                meta:{
                    access_token:token
                },
                data:userWtPasswd
            } 

            res.apiCreated(payload);
        } catch (error) {
            console.log(error);
            res.apiError(error)
        }
    },

    signin: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.apiError('Invalid email or password',401);
            }

            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.apiError('Invalid email or password.',401);
            }
            const userWtPasswd = {...user.toObject()}
            delete userWtPasswd.password
            const token = generateToken(user);

            const payload = {
                meta:{
                    access_token:token
                },
                data:userWtPasswd
            } 
            res.apiSuccess(payload);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getMe: async (req, res) => {
        try {
            const user = req.user.toObject();
            delete user.password;

                res.apiSuccess(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

export default AuthController;
