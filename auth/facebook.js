var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

const {FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CLIENT_CALLBACK} = process.env

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CLIENT_CALLBACK || "http://localhost:4000/auth/facebook/callback",
    profileFields: ["email", "name"]
  },
  async function(accessToken, refreshToken, profile, done) {
    const { email, first_name, last_name } = profile._json;
    const userData = {
      userid: profile.id,
      email,
      name: first_name + last_name
    };

    await User.update({userid: profile.id}, userData, {upsert: true, setDefaultsOnInsert: true});
    done(null, profile);
}));

module.exports = passport;