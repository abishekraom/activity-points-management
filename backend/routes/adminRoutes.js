import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isAdmin.js'; 
import User from '../models/User.js';

const router = express.Router();

router.get("/students", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { branch, year, search } = req.query;
        let query = { role: 'student' };

        if (branch) query.branch = branch;
        if (year) query.currentYear = Number(year);
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { usn: { $regex: search, $options: 'i' } }
            ];
        }

        const students = await User.find(query)
            .select('username email usn branch currentYear confirmedPoints pendingPoints')
            .sort({ username: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default router;