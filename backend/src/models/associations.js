const Applicant = require('./applicant');
const Position = require('./position');
const Skills = require('./skill');
const Experience = require('./experience');
const Region = require('./region');

function createAssociations() {
    Applicant.belongsToMany(Position, { through: 'applicant_position' });
    Position.belongsToMany(Applicant, { through: 'applicant_position' })

    Applicant.belongsToMany(Skills, { through: 'applicant_skills' });
    Skills.belongsToMany(Applicant, { through: 'applicant_skills' })

    Applicant.belongsToMany(Region, { through: 'applicant_region' });
    Region.belongsToMany(Applicant, { through: 'applicant_region' })

    Applicant.hasMany(Experience);
    Experience.belongsTo(Applicant)

    Experience.belongsToMany(Position, { through: 'experience_position' });
    Position.belongsToMany(Experience, { through: 'experience_position' });
}

module.exports = {
    createAssociations,
}