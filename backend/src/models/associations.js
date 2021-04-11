const User = require('./user');
const Applicant = require('./applicant');
const Position = require('./position');
const Skill = require('./skill');
const Experience = require('./experience');
const Region = require('./region');
const Contact = require('./contact');
const Vacancy = require('./vacancy');

function createAssociations() {
    Applicant.belongsToMany(Position, { through: 'applicant_position' });
    Position.belongsToMany(Applicant, { through: 'applicant_position' });

    Contact.belongsToMany(Position, { through: 'contact_position' });
    Position.belongsToMany(Contact, { through: 'contact_position' });

    Applicant.belongsToMany(Skill, { through: 'applicant_skills' });
    Skill.belongsToMany(Applicant, { through: 'applicant_skills' });

    Applicant.belongsToMany(Region, { through: 'applicant_region' });
    Region.belongsToMany(Applicant, { through: 'applicant_region' });

    Applicant.hasMany(Experience);
    Experience.belongsTo(Applicant)

    Experience.belongsToMany(Position, { through: 'experience_position' });
    Position.belongsToMany(Experience, { through: 'experience_position' });

    User.belongsToMany(Vacancy, { through: 'user_vacancy' });
    Vacancy.belongsToMany(User, { through: 'user_vacancy' });

    Vacancy.belongsToMany(Position, { through: 'vacancy_position' });
    Position.belongsToMany(Vacancy, { through: 'vacancy_position' });

    Vacancy.belongsToMany(Skill, { through: 'vacancy_skill' });
    Skill.belongsToMany(Vacancy, { through: 'vacancy_skill' });

    Vacancy.belongsToMany(Region, { through: 'vacancy_region' });
    Region.belongsToMany(Vacancy, { through: 'vacancy_region' });
}

module.exports = {
    createAssociations,
}