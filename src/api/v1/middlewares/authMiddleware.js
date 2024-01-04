import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.apiError('Access_Token_Required',401)
    }

    const token = authorization.split(' ')[1]
    if(!token) return res.apiError('NOT_SIGNEDIN')

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({id:id})
        if(!user) return res.apiError('UNAUTHORIZED_TOKEN')
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.apiError('Unauthorized',401)
    }
}
export default authMiddleware