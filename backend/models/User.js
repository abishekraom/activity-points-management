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
    },
    avatar: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    isLoggedIn: {
       type: Boolean,
       default: false, 
    },
    isVerified: {
       type: Boolean,
       default: false, 
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;