const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Email extends Model {}

Email.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'email' });

module.exports = Email;
