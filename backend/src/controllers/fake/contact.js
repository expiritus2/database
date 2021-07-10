const { ContactController } = require('../contact/Contact');
const Contact = require('../../models/contact');
const faker = require('faker');

const {
    generatePositions,
    generateUsers,
    generateSex,
    generatePhones,
    generateEmails,
    generateCompany,
} = require('./helpers');

const generateFakeData = async () => {
    const users = await generateUsers();
    const sex = await generateSex();
    const phones = await generatePhones();
    const emails = await generateEmails();
    const positions = await generatePositions();
    const company = await generateCompany();


    return {
        active: faker.datatype.boolean(),
        name: faker.name.findName(),
        users,
        positions,
        birthDate: faker.date.past(),
        sex,
        phones,
        emails,
        company,
    }
}

class FakeVacancyController {
    create() {
        return new Promise(async (resolve) => {
            const applicants = [];
            const array = Array.from({ length: 105 }).fill(null);
            for await (const item of array) {
                const body = await generateFakeData();
                const newVacancy = await new ContactController(body).create();
                applicants.push(newVacancy);
                console.log(applicants.length);
            }

            console.log('Success');
            resolve(applicants);
        });
    }

    delete() {
        return new Promise(async (resolve) => {
            await Contact.destroy({ where: {} });
            // const allVacancies = await Contact.findAll();
            // for await (const applicant of allVacancies) {
            //     await new ContactController().delete(applicant.id);
            // }
            resolve();
        });
    }
}

module.exports = FakeVacancyController;