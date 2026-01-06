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
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
    }],
    name: {
        type: String,
    },
    usn: {
        type: String,
    },
    year: {
        type: String,
    },
    branch: {
        type: String,
    },
    counsellor: {
        type: String,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

const UserSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    picture: String,
    usn: String,
    year: String,
    branch: String,
    counsellor: String,
    points: { type: Number, default: 0 }
});