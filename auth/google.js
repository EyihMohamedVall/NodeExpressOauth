var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_CALLBACK} = process.env

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CLIENT_CALLBACK || "http://localhost:4000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    await User.updateOne({userid: profile.id}, {userid: profile.id, name: profile.displayName}, {upsert: true, setDefaultsOnInsert: true});
    done(null, profile);
  }
));

module.exports = passport;