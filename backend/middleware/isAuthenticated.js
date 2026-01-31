import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
    console.log("--- Middleware: isAuthenticated ---");
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            console.warn("[WARN] No token found in cookies!");
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in.'
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("[DEBUG] Token decoded successfully for ID:", decoded.id);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        req.userId = user._id;
        next(); 

    } catch (error) {
        console.error("[ERROR] JWT Verification failed:", err.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Session expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}