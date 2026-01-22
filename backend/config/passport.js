import 'dotenv/config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/User.js';

const adminEmails = [
  'suhasraghavendra.ai24@rvce.edu.in', 
  'samarthsathvik.ai24@rvce.edu.in',
  'saawanvivekk.ai24@rvce.edu.in'
];

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL},

  async (accessToken, refreshToken, profile, cb) => {

    try {
      const email = profile.emails[0].value.toLowerCase();

      let user = await User.findOneAndUpdate({ googleId: profile.id }, {isLoggedIn: true});

      if(!user) {
        user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: email,
            profilePic: profile.photos[0].value,
            isLoggedIn: true,
            isVerified: true,
            role: adminEmails.includes(email) ? 'admin' : 'student'
        })
      } else {
        user.profilePic = profile.photos[0].value;
        if (adminEmails.includes(email)) {
                user.role = 'admin';
            }
        await user.save();
      }
      
      return cb(null, user);
    } catch (error) {
        return cb(error, null);
    
    }
    
  }
));