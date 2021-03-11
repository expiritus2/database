require('dotenv').config();

const express = require('express');
require('express-async-errors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

const { authRouter } = require('./routes/auth');
const { filesRouter } = require('./routes/files');
const { applicantRouter } = require('./routes/applicant');
const errorHandler = require('./middlewares/error-handler');
const sequelize = require('./util/database');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieSession({
    name: process.env.COOKIE_SESSION_NAME,
    keys: [process.env.COOKIE_KEY],
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)), // one month
}));

app.use(passport.initialize());
app.use(passport.session({}));

app.use(authRouter);
app.use(filesRouter);
app.use(applicantRouter);

app.all('*', async () => {
    console.log('Route not found!');
});

app.use(errorHandler);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening on port 3000!');
        });
    })
    .catch((err) => {
        console.log(err);
    });
