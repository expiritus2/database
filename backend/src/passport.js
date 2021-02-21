const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

passport.serializeUser((user, done) => {
    done(undefined, user);
})

passport.deserializeUser(async (user, done) => {
    done(undefined, {});
});

const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}

passport.use('google', new Strategy(options, async (accessToken, refreshToken, profile, done) => {
    console.log({ accessToken, refreshToken, profile });

    done(undefined, {});
}))

module.exports = { passport };
