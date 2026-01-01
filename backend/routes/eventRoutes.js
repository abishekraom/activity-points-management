import express from 'express';
import Event from '../models/Event.js';
import Activity from '../models/Activity.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import User from '../models/User.js';

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
        const { eventId } = req.body;
        const eventTemplate = await Event.findById(eventId);

        const newActivity = new Activity({
            eventName: eventTemplate.eventName,
            date: eventTemplate.date,
            points: eventTemplate.points,
            status: 'pending'
        });

        const savedActivity = await newActivity.save();

        await User.findByIdAndUpdate(req.user._id, {
            $push: { activities: savedActivity._id }
        });
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(500).json({ message: "Failed to add activity" });
    }
});

export default router;