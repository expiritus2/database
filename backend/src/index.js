require('dotenv').config();

const express = require('express');
require('express-async-errors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

const { authRouter } = require('./routes/auth');

const sequelize = require('./util/database');

const app = express();

app.use(cors());
// app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
    name: process.env.COOKIE_SESSION_NAME,
    keys: [process.env.COOKIE_KEY],
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)), // one month
    sameSite: 'none',
}));

app.use(passport.initialize());
app.use(passport.session({}));

app.use(authRouter);

app.all('*', async () => {
    console.log('Route not found!');
});

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening on port 3000!');
        });
    })
    .catch((err) => {
        console.log(err);
    });
