const https = require('https');
const fs = require('fs');
const path = require('path');

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

const privateKey = fs.readFileSync(path.resolve(__dirname, '..', 'server.key'));
const certificate = fs.readFileSync(path.resolve(__dirname, '..', 'server.cert'));

app.set('trust proxy', true);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieSession({
    name: process.env.COOKIE_SESSION_NAME,
    keys: [process.env.COOKIE_KEY],
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)), // one month
    sameSite: 'none'
}));

app.use(passport.initialize());
app.use(passport.session());

allRoutes(app);

app.all('*', async () => {
    console.log('Route not found!');
});


app.use(errorHandler);
createAssociations();

const listen = () => {
    https
        .createServer({ key: privateKey, cert: certificate }, app)
        .listen(3000, () => {
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
