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
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    birthDate: {
        type: DataTypes.DATE,
    },
    sex: {
        type: DataTypes.STRING,
    },
    emails: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    phones: {
        type: DataTypes.JSONB,
    },
}, { sequelize, modelName: 'contact' });

module.exports = Contact;

