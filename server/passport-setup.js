const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('./Models/Auth/Auth.model');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  async (token, tokenSecret, profile, done) => {
      try {
          let user = await UserModel.findOne({ email: profile.emails[0].value });
          if (!user) {
              user = await UserModel.create({
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  profilePic: profile.photos[0].value,
                  googleSignup: true
              });
          }
          done(null, user);
      } catch (error) {
          done(error, null);
      }
  }
));