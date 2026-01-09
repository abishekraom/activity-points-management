import express from 'express';
import User from '../models/User.js';
import { isCounselor } from '../middleware/isCounselor.js';
import { parseUSN } from '../utils/usnParser.js';

const router = express.Router();

router.get('/my-students', isCounselor, async (req, res) => {
    try {
        const students = await User.find({ counsellorEmail: req.user.email });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

router.put('/update-student/:id', isCounselor, async (req, res) => {
    const { usn, manualYear } = req.body;
    let updateData = {};

    // First time USN is assigned
    if (usn) {
        const { branch, year } = parseUSN(usn);
        updateData.usn = usn;
        updateData.branch = branch;
        updateData.currentYear = manualYear || year;
    } 
    
    // In case of year back
    if (manualYear) {
        updateData.currentYear = manualYear;
    }

    try {
        const updatedStudent = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Failed to update student profile" });
    }
});

export default router;