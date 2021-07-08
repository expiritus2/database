const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;
const { includeModelsLight, includeModelsFull, attributesLight, attributesFull } = require('../../../settings/applicant');

const getSearchOptions = (query) => {
    const { id, search, nameLat, active, sexId, ageMin, ageMax, salaryMin, salaryMax, currencyId, positionsIds, skillsIds, regionsIds } = query || {};
    const { workPlacesIds, experienceMin, experienceMax, languageId, languageLevelId } = query || {};
    const { phoneTypeId, phoneNumber, email, messengerTypeId, accountName, linkTypeId, link } = query || {};
    const { updatedAtMin, updatedAtMax, createdAtMin, createdAtMax } = query || {};

    return {
        where: {
            [Op.and]: [
                ...(id ? [{ id }] : []),
                ...(active ? [{ inActiveSearch: active }] : []),
                ...(search ? [{ [Op.or]: [{name: { [Op.iLike]: `%${search}%` }}, {nameLat: { [Op.iLike]: `%${search}%` }}] }] : []),
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
                ...(experienceMin && !experienceMax ? [{ experienceYears: { [Op.gte]: experienceMin } }] : []),
                ...(experienceMax && !experienceMin ? [{ experienceYears: { [Op.lte]: experienceMin } }] : []),
                ...(experienceMin && experienceMax ? [{ experienceYears: { [Op.between]: [experienceMin, experienceMax] } }] : []),

                ...(positionsIds ? [{ '$positions.id$': { [Op.in]: positionsIds } }] : []),
                ...(skillsIds ? [{ '$skills.id$': { [Op.in]: skillsIds } }] : []),
                ...(regionsIds ? [{ '$regions.id$': { [Op.in]: regionsIds } }] : []),
                ...(workPlacesIds ? [{ '$workPlaces.id$': { [Op.in]: workPlacesIds } }] : []),
                ...(languageId ? [{ '$languageSkills.languageId$': languageId }] : []),
                ...(languageLevelId ? [{ '$languageSkills.languageLevelId$': languageLevelId }] : []),
                ...(phoneTypeId ? [{ '$phones.phoneTypeId$': phoneTypeId }] : []),
                ...(phoneNumber ? [{ '$phones.number$': phoneNumber }] : []),
                ...(linkTypeId ? [{ '$links.linkTypeId$': linkTypeId }] : []),
                ...(link ? [{ '$links.link$': link }] : []),

                ...(updatedAtMin && !updatedAtMax ? [{ updatedAt: { [Op.gte]: updatedAtMin } }] : []),
                ...(updatedAtMax && !updatedAtMin ? [{ updatedAt: { [Op.lte]: updatedAtMax } }] : []),
                ...(updatedAtMin && updatedAtMax ? [{ updatedAt: { [Op.between]: [updatedAtMin, updatedAtMax] } }] : []),

                ...(createdAtMin && !createdAtMax ? [{ updatedAt: { [Op.gte]: createdAtMin } }] : []),
                ...(createdAtMax && !createdAtMin ? [{ updatedAt: { [Op.lte]: createdAtMax } }] : []),
                ...(createdAtMin && createdAtMax ? [{ updatedAt: { [Op.between]: [createdAtMin, createdAtMax] } }] : []),

                ...(salaryMin && !salaryMax ? [{ '$salary.amount$': { [Op.gte]: salaryMin } }] : []),
                ...(salaryMax && !salaryMin ? [{ '$salary.amount$': { [Op.lte]: salaryMax } }] : []),
                ...(salaryMin && salaryMax ? [{ '$salary.amount$': { [Op.between]: [salaryMin, salaryMax] } }] : []),
                ...(currencyId? [{ '$salary.currencyId$': currencyId }] : []),


                ...(messengerTypeId ? [{ '$messengers.messengerTypeId$': messengerTypeId }] : []),
                ...(accountName ? [{ '$messengers.accountName$': accountName }] : []),
                ...(email ? [{ '$emails.email$': email }] : []),
            ]
        },
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
        },
    }
};

module.exports = {
    getExecOptions,
}