const { ApplicantController } = require('../applicant/applicant');
const Applicant = require('../../models/applicant');
const faker = require('faker');

const {
    generateCurrency,
    generateEducation,
    generatePositions,
    generateSkills,
    generateWorkPlaces,
    generateLanguageSkills,
    generateSex,
    generatePhones,
    generateMessengers,
    generateLinks,
    generateEmails,
    generateExperiences,
    generateRegions,
} = require('./helpers');

const generateFakeData = async () => {
    const currency = await generateCurrency();
    const education = await generateEducation();
    const positions = await generatePositions();
    const skills = await generateSkills();
    const regions = await generateRegions();
    const workPlaces = await generateWorkPlaces();
    const languageSkills = await generateLanguageSkills();
    const sex = await generateSex();
    const phones = await generatePhones();
    const messengers = await generateMessengers();
    const links = await generateLinks();
    const emails = await generateEmails();
    const experiences = await generateExperiences();

    return {
        name: faker.name.findName(),
        inActiveSearch: faker.datatype.boolean(),
        salary: { amount: faker.datatype.number({ min: 1000, max: 5500 }), currency },
        education,
        positions,
        skills,
        workPlaces,
        regions,
        address: faker.address.streetAddress(),
        languageSkills,
        info: faker.lorem.text(),
        nameLat: faker.name.findName(),
        photos: [],
        birthDate: faker.date.past(),
        sex,
        phones,
        messengers,
        links,
        emails,
        files: [],
        experienceYears: faker.datatype.number({ min: 1, max: 10 }),
        experiences,
    }
}

class FakeApplicantController {
    create() {
        return new Promise(async (resolve) => {
            const applicants = [];
            const array = Array.from({ length: 200 }).fill(null);
            for await (const item of array) {
                const body = await generateFakeData();
                const newApplicant = await new ApplicantController(body).create();
                applicants.push(newApplicant);
                console.log(applicants.length);
            }

            console.log('Success');
            resolve(applicants);
        });
    }

    delete() {
        return new Promise(async (resolve) => {
            await Applicant.destroy({ where: {} });
            // const allApplicants = await Applicant.findAll();
            // for await (const applicant of allApplicants) {
            //     await new ApplicantController().delete(applicant.id);
            // }
            resolve();
        });
    }
}

module.exports = FakeApplicantController;