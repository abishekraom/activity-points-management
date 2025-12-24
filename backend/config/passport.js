import 'dotenv/config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/User.js';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL},

  async (accessToken, refreshToken, profile, cb) => {

    try {
      let user = await User.findOneAndUpdate({ googleId: profile.id }, {isLoggedIn: true});

      if(!user) {
        user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            isLoggedIn: true,
            isVerified: true,
        })
      } else {
        user.profilePic = profile.photos[0].value;
        await user.save;
      }

      console.log(user.profilePic);

      return cb(null, user);
    } catch (error) {
        return cb(error, null);
    
    }
    
  }
));