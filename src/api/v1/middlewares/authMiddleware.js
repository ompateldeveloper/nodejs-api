import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.apiError('Access_Token_Required',401)
    }

    const token = authorization.split(' ')[1]

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({id:id})
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.apiError('Unauthorized',401)
    }
}
export default authMiddleware