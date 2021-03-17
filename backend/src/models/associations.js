const Applicant = require('./applicant');
const Position = require('./position');
const Skills = require('./skill');
const Experience = require('./experience');
const Region = require('./region');

function createAssociations() {
    Applicant.belongsToMany(Position, { through: 'applicant_position' });
    Applicant.belongsToMany(Skills, { through: 'applicant_skills' });
    Applicant.belongsToMany(Region, { through: 'applicant_region' });

    Experience.belongsToMany(Position, { through: 'experience_position' });
    Experience.belongsTo(Applicant);
}

module.exports = {
    createAssociations,
}