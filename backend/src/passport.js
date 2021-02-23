const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('./models/user');

passport.serializeUser((user, done) => {
    done(undefined, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id }, attributes: ['id', 'email']});
    done(undefined, user);
});

passport.use(new Strategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ where: { email: username }});
        if (!user) {
            const newUser = (await User.create({email: username, password}));
            done(undefined, { id: newUser.id, email: newUser.email });
        } else {
            if(user.validPassword(password)) {
                done(undefined, { id: user.id, email: user.email });
            }
        }
    } catch (err) {
        done(err);
    }
}));

module.exports = { passport };
