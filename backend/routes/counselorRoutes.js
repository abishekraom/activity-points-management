import express from 'express';
import User from '../models/User.js';
import { isCounselor } from '../middleware/isCounselor.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { parseUSN } from '../utils/usnParser.js';

const router = express.Router();

router.get('/my-students', isAuthenticated, isCounselor, async (req, res) => {

    try {

        const students = await User.find({ counselorEmail: req.user.email });

        res.json(students);

    } catch (error) {

        res.status(500).json({ message: "Error fetching students" });

    }

});

router.post('/add-student', isAuthenticated, isCounselor, async (req, res) => {
    try {
        const { studentEmail } = req.body;
        const counselorEmail = req.user.email;

        // 1. Find the user with the given email
        const student = await User.findOne({ email: studentEmail });

        if (!student) {
            return res.status(404).json({ message: "Student not found with this email." });
        }

        if (student.role !== 'student') {
            return res.status(400).json({ message: "User is not a student." });
        }

        // 2. Assign the counselor's email to the student
        student.counselorEmail = counselorEmail;
        await student.save();

        res.status(200).json({ message: "Student added successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Error adding student" });
    }
});

// GET specific student details (Helper for the profile page)
router.get('/student/:id', isAuthenticated, isCounselor, async (req, res) => {
    try {
        const student = await User.findOne({ 
            _id: req.params.id, 
            counselorEmail: req.user.email 
        }).populate('activities');
        
        if (!student) return res.status(404).json({ message: "Student not found in your list." });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student details" });
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