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
    isVerified: {
       type: Boolean,
       default: false, 
    },
    confirmedPoints: {
        type: Number,
        default: 0,
    },
    pendingPoints: {
        type: Number,
        default: 0,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;