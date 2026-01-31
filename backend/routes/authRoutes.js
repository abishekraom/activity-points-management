import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import User from '../models/User.js';

const router = express.Router();

router.get("/google", passport.authenticate("google", {scope:["profile", "email"]}));

router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, process.env.SECRET_KEY, { expiresIn: '30d' });

        // Instead of ONLY a cookie, we pass the token in the URL for the frontend to grab
        // We keep the cookie as a backup, but the URL is the primary carrier now
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        // Redirect with token in query string
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
        console.error("Google login error:", error);
        res.redirect(`${process.env.CLIENT_URL}/login`);
    }
});

router.get("/me", isAuthenticated, async (req, res) => {
    try {
        console.log("--- /api/auth/me accessed ---");
        console.log("User ID from middleware:", req.user?._id);

        const user = await User.findById(req.user._id).populate('activities');
        res.json({success: true, user});
    } catch (error) {
        console.error("Error fetching user /me:", error);
        res.json({success: true, user: req.user});
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/'
    });
    res.json({ success: true, message: "Logged out" });
});

export default router;