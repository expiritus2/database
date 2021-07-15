const { authRouter } = require('./auth');
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
const { workTypesVocabularyRouter } = require('./vocabulary/workTypes');
const { workPlacesVocabularyRouter } = require('./vocabulary/workPlaces');
const { workSchedulesVocabularyRouter } = require('./vocabulary/workSchedules');
const { eventTypesVocabularyRouter } = require('./vocabulary/eventTypes');
const { languagesVocabularyRouter } = require('./vocabulary/languages');
const { languageLevelsVocabularyRouter } = require('./vocabulary/languageLevels');
const { linkTypesVocabularyRouter } = require('./vocabulary/linkTypes');
const { messengerTypesVocabularyRouter } = require('./vocabulary/messengerTypes');
const { phoneTypesVocabularyRouter } = require('./vocabulary/phoneTypes');
const { educationsVocabularyRouter } = require('./vocabulary/educations');
const { currenciesVocabularyRouter } = require('./vocabulary/currencies');
const { fileTypesVocabularyRouter } = require('./vocabulary/fileTypes');
const { sexsVocabularyRouter } = require('./vocabulary/sexs');
const { activitiesVocabularyRouter } = require('./vocabulary/activities');

const { fakeApplicantRouter } = require('./fake/applicant');
const { fakeVacancyRouter } = require('./fake/vacancy');
const { fakeCompanyRouter } = require('./fake/company');
const { fakeContactRouter } = require('./fake/contact');

module.exports = (app) => {
    app.use(authRouter);
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
    app.use(workTypesVocabularyRouter);
    app.use(workPlacesVocabularyRouter);
    app.use(workSchedulesVocabularyRouter);
    app.use(eventTypesVocabularyRouter);
    app.use(languagesVocabularyRouter);
    app.use(languageLevelsVocabularyRouter);
    app.use(linkTypesVocabularyRouter);
    app.use(messengerTypesVocabularyRouter);
    app.use(phoneTypesVocabularyRouter);
    app.use(educationsVocabularyRouter);
    app.use(currenciesVocabularyRouter);
    app.use(fileTypesVocabularyRouter);
    app.use(sexsVocabularyRouter);
    app.use(activitiesVocabularyRouter);

    app.use(fakeApplicantRouter);
    app.use(fakeVacancyRouter);
    app.use(fakeCompanyRouter);
    app.use(fakeContactRouter);
}