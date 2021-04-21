const { authRouter } = require('./auth');
const { filesRouter } = require('./files');
const { applicantRouter } = require('./applicant');
const { contactRouter } = require('./contact');
const { vacancyRouter } = require('./vacancy');
const { companyRouter } = require('./company');
const { resourcesRouter } = require('./vocabulary/resources');
const { positionsRouter } = require('./vocabulary/positions');
const { regionsRouter } = require('./vocabulary/regions');
const { skillsRouter } = require('./vocabulary/skills');

const { fakeRouter } = require('./fake');

module.exports = (app) => {
    app.use(authRouter);
    app.use(filesRouter);
    app.use(applicantRouter);
    app.use(contactRouter);
    app.use(vacancyRouter);
    app.use(companyRouter);
    app.use(resourcesRouter);
    app.use(positionsRouter);
    app.use(regionsRouter);
    app.use(skillsRouter);

    app.use(fakeRouter);
}