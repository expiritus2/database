const { CompanyController } = require('../company/Company');
const Company = require('../../models/company');
const faker = require('faker');

const {
    generateRegions,
    generateUsers,
    generateLinks,
    generateActivities,
    generateAddresses,
} = require('./helpers');

const generateFakeData = async () => {
    const users = await generateUsers();
    const regions = await generateRegions();
    const links = await generateLinks();
    const activities = await generateActivities();
    const addresses = await generateAddresses();


    return {
        active: faker.datatype.boolean(),
        name: faker.name.findName(),
        users,
        activities,
        regions,
        links,
        addresses,
        info: faker.lorem.text(),
    }
}

class FakeCompanyController {
    create() {
        return new Promise(async (resolve) => {
            const applicants = [];
            const array = Array.from({ length: 105 }).fill(null);
            for await (const item of array) {
                const body = await generateFakeData();
                const newVacancy = await new CompanyController(body).create();
                applicants.push(newVacancy);
                console.log(applicants.length);
            }

            console.log('Success');
            resolve(applicants);
        });
    }

    delete() {
        return new Promise(async (resolve) => {
            await Company.destroy({ where: {} });
            // const allVacancies = await Company.findAll();
            // for await (const applicant of allVacancies) {
            //     await new CompanyController().delete(applicant.id);
            // }
            resolve();
        });
    }
}

module.exports = FakeCompanyController;