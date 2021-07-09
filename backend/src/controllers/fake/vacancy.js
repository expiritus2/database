const { VacancyController } = require('../vacancy/vacancy');
const Vacancy = require('../../models/vacancy');
const faker = require('faker');

const {
    generateCurrency,
    generatePositions,
    generateSkills,
    generateWorkPlaces,
    generateRegions,
    generateUsers,
    generateWorkSchedules,
    generateWorkTypes,
    generateCompany,
    generateContacts,
} = require('./helpers');

const generateFakeData = async () => {
    const users = await generateUsers();
    const currency = await generateCurrency();
    const positions = await generatePositions();
    const skills = await generateSkills();
    const regions = await generateRegions();
    const workPlaces = await generateWorkPlaces();
    const workSchedules = await generateWorkSchedules();
    const workTypes = await generateWorkTypes();
    const company = await generateCompany();
    const contacts = await generateContacts();


    return {
        active: faker.datatype.boolean(),
        position: faker.random.arrayElement(positions),
        users,
        company,
        contacts,
        salaryRange: {
            min: faker.datatype.number({ min: 1000, max: 1500 }),
            max: faker.datatype.number({ min: 1500, max: 5500 }),
            currency,
        },
        experienceYears: faker.datatype.number({ min: 1, max: 10 }),
        skills,
        workPlaces,
        workSchedules,
        workTypes,
        regions,
        info: faker.lorem.text(),
    }
}

class FakeVacancyController {
    create() {
        return new Promise(async (resolve) => {
            const applicants = [];
            const array = Array.from({ length: 105 }).fill(null);
            for await (const item of array) {
                const body = await generateFakeData();
                const newVacancy = await new VacancyController(body).create();
                applicants.push(newVacancy);
                console.log(applicants.length);
            }

            console.log('Success');
            resolve(applicants);
        });
    }

    delete() {
        return new Promise(async (resolve) => {
            await Vacancy.destroy({ where: {} });
            // const allVacancies = await Vacancy.findAll();
            // for await (const applicant of allVacancies) {
            //     await new VacancyController().delete(applicant.id);
            // }
            resolve();
        });
    }
}

module.exports = FakeVacancyController;