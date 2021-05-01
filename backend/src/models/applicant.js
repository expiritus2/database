const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Applicant extends Model {}

Applicant.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    nameLat: {
        type: DataTypes.STRING,
    },
    inActiveSearch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    experienceYears: {
        type: DataTypes.FLOAT,
    },
    salary: {
        type: DataTypes.JSONB
    },
    education: {
        type: DataTypes.STRING,
    },
    place: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    address: {
        type: DataTypes.STRING,
    },
    languages: {
        type: DataTypes.JSONB,
    },
    info: {
        type: DataTypes.TEXT,
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
    files: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    phones: {
        type: DataTypes.JSONB,
    },
    messengers: {
        type: DataTypes.JSONB,
    },
    links: {
        type: DataTypes.JSONB,
    }
}, { sequelize, modelName: 'applicant' });

module.exports = Applicant;

