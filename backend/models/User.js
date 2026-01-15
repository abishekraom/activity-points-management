import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
    },
    avatar: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'counselor', 'admin'],
        default: 'student'
    },
    isVerified: {
       type: Boolean,
       default: false, 
    },

    // For students
    usn: {
        type: String,
    },
    currentYear: {
        type: Number,
    },
    branch: {
        type: String,
    },
    counselorEmail: {
        type: String,
    },

    // For Counselors
    managedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Points for Students
    confirmedPoints: {
        type: Number,
        default: 0,
    },
    pendingPoints: {
        type: Number,
        default: 0,
    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
    }],
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
