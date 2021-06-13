const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Experience extends Model {}

Experience.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    period: {
        type: DataTypes.ARRAY(DataTypes.DATE),
    },
    company: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.TEXT,
    },
}, { sequelize, modelName: 'experience' });

module.exports = Experience;
