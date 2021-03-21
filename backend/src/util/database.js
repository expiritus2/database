const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.HEROKU_POSTGRES_DB_NAME, process.env.HEROKU_POSTGRES_USER, process.env.HEROKU_POSTGRES_PASSWORD, {
    host: process.env.HEROKU_POSTGRES_HOST,
    port: 5432,
    dialect: "postgres",
    // logging: (event) => console.log(event),
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

module.exports = sequelize;
