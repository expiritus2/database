const User = require('./user');
const Applicant = require('./applicant');
const Position = require('./vocabulary/position');
const Skill = require('./vocabulary/skill');
const Experience = require('./experience');
const Region = require('./vocabulary/region');
const Education = require('./vocabulary/education');
const Language = require('./vocabulary/language');
const LanguageLevel = require('./vocabulary/languageLevel');
const Salary = require('./salary');
const Currency = require('./vocabulary/currency');
const WorkPlace = require('./vocabulary/workPlace');
const Contact = require('./contact');
const Vacancy = require('./vacancy');
const Company = require('./company');
const File = require('./file');
const FileType = require('./vocabulary/fileType')
const Phone = require('./phone');
const PhoneType = require('./vocabulary/phoneType');
const Messenger = require('./messenger');
const MessengerType = require('./vocabulary/messengerType');
const ApplicantLanguage = require('./applicantLanguage');

function createAssociations() {
    Applicant.belongsToMany(Position, { through: 'applicant_position' });
    Position.belongsToMany(Applicant, { through: 'applicant_position' });

    Applicant.belongsToMany(Skill, { through: 'applicant_skills' });
    Skill.belongsToMany(Applicant, { through: 'applicant_skills' });

    Applicant.belongsToMany(Region, { through: 'applicant_region' });
    Region.belongsToMany(Applicant, { through: 'applicant_region' });

    Applicant.hasMany(Experience);
    Experience.belongsTo(Applicant);

    Applicant.belongsTo(Education);

    Applicant.belongsToMany(WorkPlace, { through: 'applicant_workPlace' });
    WorkPlace.belongsToMany(Applicant, { through: 'applicant_workPlace'});

    Applicant.belongsTo(Salary);
    // Salary.belongsTo(Applicant);
    Salary.hasOne(Applicant)
    Salary.belongsTo(Currency);

    File.belongsTo(Applicant);
    File.belongsTo(FileType);
    Applicant.hasMany(File);

    Applicant.hasMany(Phone);
    Phone.belongsTo(Applicant);
    Phone.belongsTo(PhoneType);

    Applicant.hasMany(Messenger);
    Messenger.belongsTo(Applicant);
    Messenger.belongsTo(MessengerType);

    ApplicantLanguage.belongsTo(Language);
    ApplicantLanguage.belongsTo(LanguageLevel);
    Applicant.belongsToMany(ApplicantLanguage, { through: 'applicant_language' });
    ApplicantLanguage.belongsToMany(Applicant, { through: 'applicant_language' });



    Experience.belongsToMany(Position, { through: 'experience_position' });
    Position.belongsToMany(Experience, { through: 'experience_position' });

    Contact.belongsToMany(Position, { through: 'contact_position' });
    Position.belongsToMany(Contact, { through: 'contact_position' });

    User.belongsToMany(Vacancy, { through: 'user_vacancy' });
    Vacancy.belongsToMany(User, { through: 'user_vacancy' });

    Vacancy.belongsTo(Position);
    Position.belongsToMany(Vacancy, { through: 'vacancy_position' });

    Vacancy.belongsToMany(Skill, { through: 'vacancy_skill' });
    Skill.belongsToMany(Vacancy, { through: 'vacancy_skill' });

    Vacancy.belongsToMany(Region, { through: 'vacancy_region' });
    Region.belongsToMany(Vacancy, { through: 'vacancy_region' });

    Vacancy.belongsTo(Company);
    Company.hasMany(Vacancy);

    User.belongsToMany(Company, { through: 'user_company' });
    Company.belongsToMany(User, { through: 'user_company' });

    Region.belongsToMany(Company, { through: 'region_company' });
    Company.belongsToMany(Region, { through: 'region_company' });

    Applicant.hasMany(File, { as: 'file' });

    File.belongsTo(FileType);
    FileType.hasMany(File);
}

module.exports = {
    createAssociations,
}