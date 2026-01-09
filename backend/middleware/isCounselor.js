export const isCounselor = (req, res, next) => {
    if (req.user && req.user.role === 'counselor') {
        next();
    } else {
        res.status(403).json({ message: "Access denied." });
    }
};