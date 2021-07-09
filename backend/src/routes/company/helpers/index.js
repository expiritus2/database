const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { includeModelsFull, includeModelsLight, attributesFull, attributesLight } = require('../../../settings/company');

const getSearchOptions = (query) => {
    const { id, search, active, userIds, activitiesIds, regionsIds, linkTypeId, link } = query || {};
    const { updatedAtMin, updatedAtMax, createdAtMin, createdAtMax } = query || {};

    return {
        where: {
            [Op.and]: [
                ...(id ? [{ id }] : []),
                ...(active ? [{ active }] : []),
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(userIds ? [{ '$users.id$': { [Op.in]: userIds } }] : []),
                ...(activitiesIds ? [{ '$activities.id$': { [Op.in]: activitiesIds } }] : []),
                ...(regionsIds ? [{ '$regions.id$': { [Op.in]: regionsIds } }] : []),
                ...(linkTypeId ? [{ '$links.linkTypeId$': linkTypeId }] : []),
                ...(link ? [{ '$links.link$': link }] : []),
                ...(updatedAtMin && !updatedAtMax ? [{ updatedAt: { [Op.gte]: updatedAtMin } }] : []),
                ...(updatedAtMax && !updatedAtMin ? [{ updatedAt: { [Op.lte]: updatedAtMax } }] : []),
                ...(updatedAtMin && updatedAtMax ? [{ updatedAt: { [Op.between]: [updatedAtMin, updatedAtMax] } }] : []),

                ...(createdAtMin && !createdAtMax ? [{ updatedAt: { [Op.gte]: createdAtMin } }] : []),
                ...(createdAtMax && !createdAtMin ? [{ updatedAt: { [Op.lte]: createdAtMax } }] : []),
                ...(createdAtMin && createdAtMax ? [{ updatedAt: { [Op.between]: [createdAtMin, createdAtMax] } }] : []),
            ]
        }
    }
}

const getExecOptions = (query) => {
    const { page, countPerPage, ...search } = query || {};

    const isSearch = !!Object.keys(search).length;

    return {
        isSearch,
        page,
        countPerPage,
        options: {
            ...getSearchOptions(query),
            limit: !isSearch ? (countPerPage || 25) : undefined,
            offset: !isSearch ? ((page * countPerPage) || 0) : undefined,
            order: [
                ['updatedAt', 'DESC']
            ],
            include: !isSearch ? includeModelsLight : includeModelsFull,
            attributes: !isSearch ? attributesLight : attributesFull,
            distinct: true,
        }
    }
};

module.exports = {
    getExecOptions,
}