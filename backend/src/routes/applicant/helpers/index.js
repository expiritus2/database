const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { includeModelsLight, attributesLight } = require('../../../settings/applicant');

const getSearchOptions = (query) => {
    const { search, active } = query || {};
    return {
        where: {
            [Op.and]: [
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(active ? [{ inActiveSearch: active }] : []),
            ]
        }
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
    }
};

module.exports = {
    getExecOptions,
}