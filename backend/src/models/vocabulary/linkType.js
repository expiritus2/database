const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class LinkType extends Model {}

LinkType.init({
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
},{ sequelize, modelName: 'linkType' });

module.exports = LinkType;
