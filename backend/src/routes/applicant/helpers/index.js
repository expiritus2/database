const Salary = require('../../../models/salary');
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;
const { includeModelsLight, attributesLight } = require('../../../settings/applicant');

const getSearchOptions = (query) => {
    const { id, search, nameLat, active, sexId, ageMin, ageMax, salaryMin, salaryMax, currencyId } = query || {};

    return {
        where: {
            [Op.and]: [
                ...(id ? [{ id }] : []),
                ...(active ? [{ inActiveSearch: active }] : []),
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(nameLat ? [{ nameLat: { [Op.iLike]: `%${nameLat}%` } }] : []),
                ...(sexId ? [{ sexId }] : []),
                ...(ageMin && !ageMax ? [{ birthDate: { [Op.lte]: moment().subtract(ageMin, 'years').toDate() } }] : []),
                ...(ageMax && !ageMin ? [{ birthDate: { [Op.gte]: moment().subtract(ageMax, 'years').toDate() } }] : []),
                ...(ageMin && ageMax
                    ? [{
                        birthDate: {
                            [Op.between]: [
                                moment().subtract(ageMax, 'years').toDate(),
                                moment().subtract(ageMin, 'years').toDate()]
                        }
                    }] : []),
                // ...(salaryMin && !salaryMax ? [{ 'Salaries.amount': { [Op.gte]: salaryMin } }] : [])
            ]
        },
    }
}

const getExecOptions = (query) => {
    const { page, countPerPage } = query || {};
    return {
        ...getSearchOptions(query),
        limit: countPerPage || 25,
        offset: (page * countPerPage) || 0,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: includeModelsLight,
        attributes: attributesLight,
        distinct: true,
    }
};

module.exports = {
    getExecOptions,
}