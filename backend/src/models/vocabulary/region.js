const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class Region extends Model {}

Region.init({
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
},{ sequelize, modelName: 'vocabularyRegion' });

module.exports = Region;
