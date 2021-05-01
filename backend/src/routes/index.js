const { authRouter } = require('./auth');
const { filesRouter } = require('./files');
const { applicantRouter } = require('./applicant');
const { contactRouter } = require('./contact');
const { vacancyRouter } = require('./vacancy');
const { companyRouter } = require('./company');
const { usersRouter } = require('./user');

const { resourcesVocabularyRouter } = require('./vocabulary/resources');
const { positionsVocabularyRouter } = require('./vocabulary/positions');
const { regionsVocabularyRouter } = require('./vocabulary/regions');
const { skillsVocabularyRouter } = require('./vocabulary/skills');
const { contactsVocabularyRouter } = require('./vocabulary/contacts');
const { companiesVocabularyRouter } = require('./vocabulary/companies');

const { fakeRouter } = require('./fake');

module.exports = (app) => {
    app.use(authRouter);
    app.use(filesRouter);
    app.use(applicantRouter);
    app.use(contactRouter);
    app.use(vacancyRouter);
    app.use(companyRouter);
    app.use(usersRouter);

    app.use(resourcesVocabularyRouter);
    app.use(positionsVocabularyRouter);
    app.use(regionsVocabularyRouter);
    app.use(skillsVocabularyRouter);
    app.use(contactsVocabularyRouter);
    app.use(companiesVocabularyRouter);

    app.use(fakeRouter);
}