import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        // Check Header FIRST, then fallback to Cookie
        const authHeader = req.headers.authorization;
        let token = authHeader && authHeader.split(' ')[1]; 
        
        if (!token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        req.user = user;
        req.userId = user._id;
        next(); 
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid session" });
    }
};