const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class WorkPlace extends Model {}

WorkPlace.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    label: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
    }
},{ sequelize, modelName: 'workPlaces' });

module.exports = WorkPlace;
