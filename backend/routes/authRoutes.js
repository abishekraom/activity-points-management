import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import User from '../models/User.js';

const router = express.Router();

router.get("/google", passport.authenticate("google", {scope:["profile", "email"]}));

router.get("/google/callback", passport.authenticate("google", {session: false}), (req, res) => {

    try {
        const token = jwt.sign({id: req.user._id, email: req.user.email}, process.env.SECRET_KEY, {expiresIn: "30d"});

        res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', maxAge: 30 * 24 * 60 * 60 * 1000})


        res.redirect(`${process.env.CLIENT_URL}/auth-success`);
    } catch (error) {
        console.error("Google login error:", error);
        res.redirect(`${process.env.CLIENT_URL}/login`);
    }
});

router.get("/me", isAuthenticated, (req, res) => {
    res.json({success: true, user: req.user});
});

router.post("/logout", (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'Lax',
        path: '/'
    });
    res.json({ success: true, message: "Logged out" });
});

router.put('/update', isAuthenticated, async (req, res) => {
  try {
    const { name, usn, year, branch, counsellor } = req.body;
    // Assuming your auth middleware puts user ID in req.user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { name, usn, year, branch, counsellor },
      { new: true } // Returns the updated document
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;