const Applicant = require('./applicant');
const Phone = require('./phone');

function createAssociations() {
    Phone.belongsTo(Applicant);
}

module.exports = {
    createAssociations,
}