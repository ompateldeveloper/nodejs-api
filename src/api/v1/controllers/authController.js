import bcrypt from "bcrypt"
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js"
import sanitizeUser from "../utils/sanitizeUser.js"
import Validator from "validatorjs"
const AuthController = {
    signup: async (req, res) => {
        try {

            const validation = new Validator(req.body, {
                name: 'required|min:2',
                email: 'required|email',
                password: ['required','regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]+$/'],
            });
        
            if (validation.fails()) {
                return res.apiError(validation.errors.all());
            }

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
            const sanitizedUser = sanitizeUser(newUser);
            const token = generateToken(newUser);
        
            const payload = {
                meta:{
                    access_token:token
                },
                data:sanitizedUser
            } 

            res.apiCreated(payload);
        } catch (error) {
            res.apiError(error)
        }
    },

    signin: async (req, res) => {
        try {
            const validation = new Validator(req.body, {
                email: 'required|email',
                password: ['required','regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]+$/'],
            });
        
            if (validation.fails()) {
                return res.apiError(validation.errors.all());
            }
            
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.apiError('Invalid email or password',401);
            }

            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return res.apiError('Invalid email or password.',401);
            }
            const sanitizedUser = sanitizeUser(user);
            const token = generateToken(user);

            const payload = {
                meta:{
                    access_token:token
                },
                data:sanitizedUser
            } 
            res.apiSuccess(payload);
        } catch (error) {
            res.apiError(error);
        }
    },

    getMe: async (req, res) => {
        try {
            const user = sanitizeUser(req.user);
            res.apiSuccess({data:user});
        } catch (error) {
            res.apiError( error);
        }
    },

};

export default AuthController;
