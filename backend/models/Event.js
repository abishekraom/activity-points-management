import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
    },
    posterUrl: {
        type: String,
        trim: true
    },
    registrationUrl: {
        type: String,
        trim: true,
    }
})

const Event = mongoose.model('Event', eventSchema);

export default Event;