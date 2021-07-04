const Currency = require('../../../models/vocabulary/currency');
const Education = require('../../../models/vocabulary/education');
const Position = require('../../../models/vocabulary/position');
const Skill = require('../../../models/vocabulary/skill');
const WorkPlace = require('../../../models/vocabulary/workPlace');
const Region = require('../../../models/vocabulary/region');
const Language = require('../../../models/vocabulary/language');
const LanguageLevel = require('../../../models/vocabulary/languageLevel');
const Sex = require('../../../models/vocabulary/sex');
const PhoneType = require('../../../models/vocabulary/phoneType');
const MessengerType = require('../../../models/vocabulary/messengerType');
const LinkType = require('../../../models/vocabulary/linkType');

const faker = require('faker');

const getRecordRandom = (records = []) => {
    return faker.datatype.number({ min: 0, max: records.length - 1 });
}

const generateCurrency = () => {
    return new Promise(async (resolve) => {
        const items = await Currency.findAll() || [];
        const random = getRecordRandom(items);
        resolve(items[random].toJSON());
    });
}

const generateEducation = () => {
    return new Promise(async (resolve) => {
        const items = await Education.findAll() || [];
        const random = getRecordRandom(items);
        resolve(items[random].toJSON());
    });
}

const generatePositions = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await Position.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            const random = getRecordRandom(items);
            datas.push(items[random].toJSON());
        }
        resolve(datas);
    });
}

const generateSkills = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await Skill.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 5 }); i++) {
            const random = getRecordRandom(items);
            datas.push(items[random].toJSON());
        }
        resolve(datas);
    });
}

const generateWorkPlaces = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await WorkPlace.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            const random = getRecordRandom(items);
            datas.push(items[random].toJSON());
        }
        resolve(datas);
    });
}

const generateRegions = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await Region.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
            const random = getRecordRandom(items);
            datas.push(items[random].toJSON());
        }
        resolve(datas);
    });
}

const generateLanguage = () => {
    return new Promise(async (resolve) => {
        const items = await Language.findAll() || [];
        const random = getRecordRandom(items);
        resolve(items[random].toJSON());
    });
}

const generateLanguageLevel = () => {
    return new Promise(async (resolve) => {
        const items = await LanguageLevel.findAll() || [];
        const random = getRecordRandom(items);
        resolve(items[random].toJSON());
    });
}

const generateLanguageSkills = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const language = await generateLanguage();
        const languageLevel = await generateLanguageLevel();

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            datas.push({ language, languageLevel });
        }
        resolve(datas);
    });
}

const generateSex = () => {
    return new Promise(async (resolve) => {
        const items = await Sex.findAll() || [];

        const random = getRecordRandom(items);
        resolve(items[random].toJSON());
    });
}

const generatePhones = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await PhoneType.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            const random = getRecordRandom(items);
            const phoneType = items[random].toJSON();
            datas.push({ number: 375296762632, phoneType });
        }
        resolve(datas);
    });
}

const generateMessengers = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await MessengerType.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            const random = getRecordRandom(items);
            const messengerType = items[random].toJSON();
            datas.push({ accountName: faker.finance.accountName(), messengerType });
        }
        resolve(datas);
    });
}

const generateLinks = () => {
    return new Promise(async (resolve) => {
        const datas = [];
        const items = await LinkType.findAll() || [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            const random = getRecordRandom(items);
            const linkType = items[random].toJSON();
            datas.push({ link: faker.internet.url(), linkType });
        }
        resolve(datas);
    });
}

const generateEmails = () => {
    return new Promise(async (resolve) => {
        const datas = [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 2 }); i++) {
            datas.push({ email: faker.internet.email() });
        }
        resolve(datas);
    });
}

const generateExperiences = () => {
    return new Promise(async (resolve) => {
        const datas = [];

        for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
            const period = [faker.date.past(), faker.date.recent()];
            const company = faker.company.companyName();
            const positions = await generatePositions();
            const info = faker.lorem.text();
            datas.push({ period, company, positions, info });
        }
        resolve(datas);
    });
}

module.exports = {
    generateCurrency,
    generateEducation,
    generatePositions,
    generateSkills,
    generateWorkPlaces,
    generateRegions,
    generateLanguage,
    generateLanguageLevel,
    generateLanguageSkills,
    generateSex,
    generatePhones,
    generateMessengers,
    generateLinks,
    generateEmails,
    generateExperiences,
}