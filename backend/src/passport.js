const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('./models/user');
const AuthenticationError = require('./errors/authentication-error');

passport.serializeUser((user, done) => {
    done(undefined, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id }, attributes: ['id', 'email', 'role'] });
    done(undefined, user);
});

passport.use(new Strategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ where: { email: username } });
        if (!user) {
            const newUser = (await User.create({ email: username, password }));
            done(undefined, { id: newUser.id, email: newUser.email, role: newUser.role });
        } else {
            if (user.validPassword(password)) {
                done(undefined, { id: user.id, email: user.email, role: user.role });
            } else {
                throw new AuthenticationError();
            }
        }
    } catch (err) {
        done(err);
    }
}));

module.exports = { passport };
