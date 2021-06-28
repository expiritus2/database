const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Contact extends Model {}

Contact.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    birthDate: {
        type: DataTypes.DATE,
    },
}, { sequelize, modelName: 'contact' });

module.exports = Contact;

