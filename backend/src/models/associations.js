const User = require('./user');
const Applicant = require('./applicant');
const Experience = require('./experience');
const Salary = require('./salary');
const Contact = require('./contact');
const Vacancy = require('./vacancy');
const Company = require('./company');
const File = require('./file');
const Photo = require('./photo');
const Phone = require('./phone');
const Messenger = require('./messenger');
const ApplicantLanguage = require('./language');
const Email = require('./email');
const Link = require('./link');

const VocabularyPosition = require('./vocabulary/position');
const VocabularySkill = require('./vocabulary/skill');
const VocabularyRegion = require('./vocabulary/region');
const VocabularyEducation = require('./vocabulary/education');
const VocabularyLanguage = require('./vocabulary/language');
const VocabularyLanguageLevel = require('./vocabulary/languageLevel');
const VocabularyCurrency = require('./vocabulary/currency');
const VocabularyWorkPlace = require('./vocabulary/workPlace');
const VocabularyPhoneType = require('./vocabulary/phoneType');
const VocabularyFileType = require('./vocabulary/fileType');
const VocabularyMessengerType = require('./vocabulary/messengerType');
const VocabularySex = require('./vocabulary/sex');
const VocabularyLinkType = require('./vocabulary/linkType');

function createAssociations() {
    Applicant.belongsToMany(VocabularyPosition, { through: 'applicant_position' });
    VocabularyPosition.belongsToMany(Applicant, { through: 'applicant_position' });

    Applicant.belongsToMany(VocabularySkill, { through: 'applicant_skills' });
    VocabularySkill.belongsToMany(Applicant, { through: 'applicant_skills' });

    Applicant.belongsToMany(VocabularyRegion, { through: 'applicant_region' });
    VocabularyRegion.belongsToMany(Applicant, { through: 'applicant_region' });

    Applicant.hasMany(Experience);
    Experience.belongsTo(Applicant);

    Applicant.belongsTo(VocabularyEducation);
    Applicant.belongsTo(VocabularySex);

    Applicant.belongsToMany(VocabularyWorkPlace, { through: 'applicant_workPlace' });
    VocabularyWorkPlace.belongsToMany(Applicant, { through: 'applicant_workPlace'});

    Applicant.belongsTo(Salary);
    Salary.hasOne(Applicant)
    Salary.belongsTo(VocabularyCurrency);

    File.belongsTo(Applicant);
    File.belongsTo(VocabularyFileType);
    Applicant.hasMany(File);

    Photo.belongsTo(Applicant);
    Applicant.hasMany(Photo);

    Phone.belongsTo(Applicant);
    Phone.belongsTo(VocabularyPhoneType);
    Applicant.hasMany(Phone);

    Applicant.hasMany(Messenger);
    Messenger.belongsTo(Applicant);
    Messenger.belongsTo(VocabularyMessengerType);

    Applicant.hasMany(Email);
    Email.belongsTo(Applicant);

    Applicant.hasMany(Link);
    Link.belongsTo(Applicant);
    Link.belongsTo(VocabularyLinkType);

    ApplicantLanguage.belongsTo(VocabularyLanguage);
    ApplicantLanguage.belongsTo(VocabularyLanguageLevel);
    Applicant.belongsToMany(ApplicantLanguage, { through: 'applicant_language' });
    ApplicantLanguage.belongsToMany(Applicant, { through: 'applicant_language' });



    Experience.belongsToMany(VocabularyPosition, { through: 'experience_position' });
    VocabularyPosition.belongsToMany(Experience, { through: 'experience_position' });

    Contact.belongsToMany(VocabularyPosition, { through: 'contact_position' });
    VocabularyPosition.belongsToMany(Contact, { through: 'contact_position' });

    User.belongsToMany(Vacancy, { through: 'user_vacancy' });
    Vacancy.belongsToMany(User, { through: 'user_vacancy' });

    Vacancy.belongsTo(VocabularyPosition);
    VocabularyPosition.belongsToMany(Vacancy, { through: 'vacancy_position' });

    Vacancy.belongsToMany(VocabularySkill, { through: 'vacancy_skill' });
    VocabularySkill.belongsToMany(Vacancy, { through: 'vacancy_skill' });

    Vacancy.belongsToMany(VocabularyRegion, { through: 'vacancy_region' });
    VocabularyRegion.belongsToMany(Vacancy, { through: 'vacancy_region' });

    Vacancy.belongsTo(Company);
    Company.hasMany(Vacancy);

    User.belongsToMany(Company, { through: 'user_company' });
    Company.belongsToMany(User, { through: 'user_company' });

    VocabularyRegion.belongsToMany(Company, { through: 'region_company' });
    Company.belongsToMany(VocabularyRegion, { through: 'region_company' });
}

module.exports = {
    createAssociations,
}