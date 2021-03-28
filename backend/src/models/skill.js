const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Skill extends Model {}

Skill.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    label: {
        type: DataTypes.CHAR(255),
    },
    value: {
        type: DataTypes.CHAR(255),
    }
},{ sequelize, modelName: 'skill' });

module.exports = Skill;
