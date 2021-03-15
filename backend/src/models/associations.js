const Applicant = require('./applicant');
const Phone = require('./phone');
const Position = require('./position');
const Skills = require('./skill');
const Experience = require('./experience');

function createAssociations() {
    Phone.belongsTo(Applicant);

    Applicant.belongsToMany(Position, { through: 'applicant_position' });
    Applicant.belongsToMany(Skills, { through: 'applicant_skills' });

    Experience.belongsToMany(Position, { through: 'experience_position' });
    Experience.belongsTo(Applicant);
}

module.exports = {
    createAssociations,
}