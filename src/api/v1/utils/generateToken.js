import jwt from 'jsonwebtoken';

export default function generateToken (user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey);
};