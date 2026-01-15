import express from 'express';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Activity from '../models/Activity.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { syncUserPoints } from '../services/pointsService.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const events = await Event.find().sort({ date: -1});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events" });
    }
});

router.get('/user-activities', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('activities');
        res.json(user.activities || []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities" });
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    try {
        const { eventName, date, points, certificateUrl, reportUrl } = req.body;

        const newActivity = new Activity({
            eventName,
            date: new Date(date),
            points: Number(points),
            status: 'pending',
            certificateUrl,
            reportUrl,
        });

        const savedActivity = await newActivity.save();

        await User.findByIdAndUpdate(req.user._id, {
            $push: { activities: savedActivity._id }
        });
        await syncUserPoints(req.user._id);

        res.status(201).json(savedActivity);
    } catch (error) {
        console.error("Add Activity Error:", error);
        res.status(500).json({ message: "Failed to add activity" });
    }
});

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const activityId = req.params.id;

        await Activity.findByIdAndDelete(activityId);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {activities: activityId}
        });
        await syncUserPoints(req.user._id);

        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Failed to delete activity" });
    }
})

export default router;