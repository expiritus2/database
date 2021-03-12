const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Applicant = sequelize.define('applicant', {
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
    experience: {
        type: DataTypes.FLOAT,
    },
    salary: {
        type: DataTypes.FLOAT,
    },
    currency: {
        type: DataTypes.CHAR(100),
    },
    education: {
        type: DataTypes.CHAR(100),
    },
    position: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    place: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    regions: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    info: {
        type: DataTypes.TEXT,
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    birthDate: {
        type: DataTypes.BIGINT,
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
    }
}, {
    timestamps: true,
});

module.exports = Applicant;

