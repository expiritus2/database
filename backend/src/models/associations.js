const User = require('./user');
const Applicant = require('./applicant');
const Experience = require('./experience');
const Salary = require('./salary');
const SalaryRange = require('./salaryRange');
const Contact = require('./contact');
const Vacancy = require('./vacancy');
const Company = require('./company');
const File = require('./file');
const Photo = require('./photo');
const Phone = require('./phone');
const Messenger = require('./messenger');
const LanguageSkill = require('./languageSkill');
const Email = require('./email');
const Link = require('./link');
const Address = require('./address');

const VocabularyPosition = require('./vocabulary/position');
const VocabularySkill = require('./vocabulary/skill');
const VocabularyRegion = require('./vocabulary/region');
const VocabularyEducation = require('./vocabulary/education');
const VocabularyLanguage = require('./vocabulary/language');
const VocabularyLanguageLevel = require('./vocabulary/languageLevel');
const VocabularyCurrency = require('./vocabulary/currency');
const VocabularyWorkPlace = require('./vocabulary/workPlace');
const VocabularyWorkSchedule = require('./vocabulary/workSchedule');
const VocabularyWorkType = require('./vocabulary/workType');
const VocabularyPhoneType = require('./vocabulary/phoneType');
const VocabularyFileType = require('./vocabulary/fileType');
const VocabularyMessengerType = require('./vocabulary/messengerType');
const VocabularySex = require('./vocabulary/sex');
const VocabularyLinkType = require('./vocabulary/linkType');
const VocabularyActivity = require('./vocabulary/activity');

const ThroughApplicantPosition = require('./through/applicantPosition');
const ThroughApplicantSkill = require('./through/applicantSkill');
const ThroughApplicantRegion = require('./through/applicantRegion');
const ThroughApplicantWorkPlace = require('./through/applicantWorkPlace');
const ThroughApplicantLanguage = require('./through/applicantLanguage');
const ThroughExperiencePosition = require('./through/experiencePosition');
const ThroughContactPosition = require('./through/contactPosition');
const ThroughVacancyUser = require('./through/vacancyUser');
const ThroughVacancyRegion = require('./through/vacancyRegion');
const ThroughVacancySkill = require('./through/vacancySkill');
const ThroughVacancyWorkPlace = require('./through/vacancyWorkPlace');
const ThroughVacancyWorkSchedule = require('./through/vacancyWorkSchedule');
const ThroughVacancyWorkType = require('./through/vacancyWorkType');
const ThroughCompanyUser = require('./through/companyUser');
const ThroughCompanyRegion = require('./through/companyRegion');
const ThroughCompanyActivity = require('./through/companyActivity');

function createAssociations() {
    Applicant.belongsToMany(VocabularyPosition, { through: ThroughApplicantPosition });
    Applicant.belongsToMany(VocabularySkill, { through: ThroughApplicantSkill });
    Applicant.belongsToMany(VocabularyRegion, { through: ThroughApplicantRegion });
    Applicant.belongsToMany(VocabularyWorkPlace, { through: ThroughApplicantWorkPlace });
    Applicant.belongsToMany(LanguageSkill, { through: ThroughApplicantLanguage });
    Experience.belongsToMany(VocabularyPosition, { through: ThroughExperiencePosition });
    VocabularyPosition.belongsToMany(Experience, { through: ThroughExperiencePosition });

    Applicant.belongsTo(VocabularyEducation);
    Applicant.belongsTo(VocabularySex);
    Salary.belongsTo(Applicant);
    Applicant.hasOne(Salary);
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
    LanguageSkill.belongsTo(VocabularyLanguage);
    LanguageSkill.belongsTo(VocabularyLanguageLevel);
    Applicant.hasMany(Experience);
    Experience.belongsTo(Applicant);


    Vacancy.belongsToMany(User, { through: ThroughVacancyUser });
    Vacancy.belongsToMany(VocabularySkill, { through: ThroughVacancySkill });
    Vacancy.belongsToMany(VocabularyRegion, { through: ThroughVacancyRegion });
    Vacancy.belongsToMany(VocabularyWorkPlace, { through: ThroughVacancyWorkPlace });
    Vacancy.belongsToMany(VocabularyWorkSchedule, { through: ThroughVacancyWorkSchedule });
    Vacancy.belongsToMany(VocabularyWorkType, { through: ThroughVacancyWorkType });

    Vacancy.belongsTo(VocabularyPosition);
    Vacancy.belongsTo(Company);
    Company.hasMany(Vacancy);
    File.belongsTo(Vacancy);
    File.belongsTo(VocabularyFileType);
    Vacancy.hasMany(File);
    SalaryRange.belongsTo(Vacancy);
    Vacancy.hasOne(SalaryRange);
    SalaryRange.belongsTo(VocabularyCurrency);



    Company.belongsToMany(User, { through: ThroughCompanyUser });
    Company.belongsToMany(VocabularyRegion, { through: ThroughCompanyRegion });

    Photo.belongsTo(Company);
    Company.hasOne(Photo);

    Address.belongsTo(Company);
    Company.hasMany(Address);

    Company.hasMany(Link);
    Link.belongsTo(Company);
    Link.belongsTo(VocabularyLinkType);

    Company.belongsToMany(VocabularyActivity, { through: ThroughCompanyActivity });



    Contact.belongsToMany(VocabularyPosition, { through: ThroughContactPosition });
}

module.exports = {
    createAssociations,
}