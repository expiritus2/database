require('dotenv').config();

const express = require('express');
require('express-async-errors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');
const sequelize = require('./util/database');
const { createAssociations } = require('./models/associations');
const allRoutes = require('./routes');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieSession({
    name: process.env.COOKIE_SESSION_NAME,
    keys: [process.env.COOKIE_KEY],
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)), // one month
}));

app.use(passport.initialize());

app.use(passport.session({}));

allRoutes(app);

app.all('*', async () => {
    console.log('Route not found!');
});

app.use(errorHandler);
createAssociations();

const listen = () => {
    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
}

const connectDb = (sync) => {
    // if (!sync) {
    //     return listen();
    // }

    return sequelize.sync({ force: sync })
        .then(() => listen())
        .catch((err) => console.log(err));
}

connectDb(false);
