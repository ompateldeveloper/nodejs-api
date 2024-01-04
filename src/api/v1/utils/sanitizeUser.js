export default function sanitizeUser (user) {
    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.password;
    delete sanitizedUser.__v;
    delete sanitizedUser._id;
    return sanitizedUser;
};