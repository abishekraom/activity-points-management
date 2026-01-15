import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isAdmin.js'; 
import User from '../models/User.js';

const router = express.Router();

router.get("/students", isAuthenticated, isAdmin, async (req, res) => {
    try {
        // Find all users with the role 'student'
        const students = await User.find({ role: 'student' })
            .select('username email usn branch confirmedPoints pendingPoints')
            .sort({ username: 1 });

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


router.get("/stats", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const stats = await User.aggregate([
            { $match: { role: 'student' } },
            { 
                $group: { 
                    _id: null, 
                    totalConfirmed: { $sum: "$confirmedPoints" },
                    totalPending: { $sum: "$pendingPoints" }
                } 
            }
        ]);
        res.json({ success: true, stats: stats[0] || { totalConfirmed: 0, totalPending: 0 } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;