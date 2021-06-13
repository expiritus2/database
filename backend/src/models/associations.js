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
const ApplicantLanguage = require('./languageSkill');
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
    Applicant.belongsToMany(VocabularyPosition, { through: 'through_applicant_position' });
    VocabularyPosition.belongsToMany(Applicant, { through: 'through_applicant_position' });

    Applicant.belongsToMany(VocabularySkill, { through: 'through_applicant_skills' });
    VocabularySkill.belongsToMany(Applicant, { through: 'through_applicant_skills' });

    Applicant.belongsToMany(VocabularyRegion, { through: 'through_applicant_region' });
    VocabularyRegion.belongsToMany(Applicant, { through: 'through_applicant_region' });

    Applicant.belongsTo(VocabularyEducation);
    Applicant.belongsTo(VocabularySex);

    Applicant.belongsToMany(VocabularyWorkPlace, { through: 'through_applicant_workPlace' });
    VocabularyWorkPlace.belongsToMany(Applicant, { through: 'through_applicant_workPlace'});

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
    Applicant.belongsToMany(ApplicantLanguage, { through: 'through_applicant_language' });
    ApplicantLanguage.belongsToMany(Applicant, { through: 'through_applicant_language' });


    Applicant.hasMany(Experience);
    Experience.belongsTo(Applicant);

    Experience.belongsToMany(VocabularyPosition, { through: 'through_experience_position' });
    VocabularyPosition.belongsToMany(Experience, { through: 'through_experience_position' });

    Contact.belongsToMany(VocabularyPosition, { through: 'through_contact_position' });
    VocabularyPosition.belongsToMany(Contact, { through: 'through_contact_position' });

    User.belongsToMany(Vacancy, { through: 'through_user_vacancy' });
    Vacancy.belongsToMany(User, { through: 'through_user_vacancy' });

    Vacancy.belongsTo(VocabularyPosition);
    VocabularyPosition.belongsToMany(Vacancy, { through: 'through_vacancy_position' });

    Vacancy.belongsToMany(VocabularySkill, { through: 'through_vacancy_skill' });
    VocabularySkill.belongsToMany(Vacancy, { through: 'through_vacancy_skill' });

    Vacancy.belongsToMany(VocabularyRegion, { through: 'through_vacancy_region' });
    VocabularyRegion.belongsToMany(Vacancy, { through: 'through_vacancy_region' });

    Vacancy.belongsTo(Company);
    Company.hasMany(Vacancy);

    User.belongsToMany(Company, { through: 'through_user_company' });
    Company.belongsToMany(User, { through: 'through_user_company' });

    VocabularyRegion.belongsToMany(Company, { through: 'through_region_company' });
    Company.belongsToMany(VocabularyRegion, { through: 'through_region_company' });
}

module.exports = {
    createAssociations,
}