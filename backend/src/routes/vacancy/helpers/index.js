const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { includeModelsFull, includeModelsLight, attributesFull, attributesLight } = require('../../../settings/vacancy');

const getSearchOptions = (query) => {
    const { id, search, active, positionId, userIds, salaryMin, salaryMax, currencyId } = query || {};
    const { experienceMin, experienceMax, skillsIds, regionsIds, workPlacesIds } = query || {};
    const { workSchedulesIds, workTypesIds } = query || {};

    return {
        where: {
            [Op.and]: [
                ...(id ? [{ id }] : []),
                ...(active ? [{ active }] : []),
                ...(search ? [{ '$position.label$': { [Op.iLike]: `%${search}%` } }] : []),
                ...(positionId ? [{ positionId }] : []),
                ...(userIds ? [{ '$users.id$': { [Op.in]: userIds } }] : []),

                ...(salaryMin && !salaryMax ? [{ '$salaryRange.min$': { [Op.gte]: salaryMin } }] : []),
                ...(salaryMax && !salaryMin ? [{ '$salaryRange.max$': { [Op.lte]: salaryMax } }] : []),
                ...(salaryMin && salaryMax
                    ? [{
                        [Op.and]: [
                            { '$salaryRange.min$': { [Op.gte]: salaryMin } },
                            { '$salaryRange.max$': { [Op.lte]: salaryMax } }
                        ]
                    }] : []),
                ...(currencyId ? [{ '$salaryRange.currencyId$': currencyId }] : []),

                ...(experienceMin && !experienceMax ? [{ experienceYears: { [Op.gte]: experienceMin } }] : []),
                ...(experienceMax && !experienceMin ? [{ experienceYears: { [Op.lte]: experienceMin } }] : []),
                ...(experienceMin && experienceMax ? [{ experienceYears: { [Op.between]: [experienceMin, experienceMax] } }] : []),

                ...(skillsIds ? [{ '$skills.id$': { [Op.in]: skillsIds } }] : []),
                ...(regionsIds ? [{ '$regions.id$': { [Op.in]: regionsIds } }] : []),
                ...(workPlacesIds ? [{ '$workPlaces.id$': { [Op.in]: workPlacesIds } }] : []),
                ...(workSchedulesIds ? [{ '$workSchedules.id$': { [Op.in]: workSchedulesIds } }] : []),
                ...(workTypesIds ? [{ '$workTypes.id$': { [Op.in]: workTypesIds } }] : []),
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