import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    points: {
        type: Number,
        min: 0,
        default: 0,
        required:true,
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'rejected'],
    },
    certificateUrl: {
        type: String,
        trim: true,
    },
    reportUrl: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;