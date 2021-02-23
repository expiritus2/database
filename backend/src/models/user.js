const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../util/database');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize,
    modelName: 'user'
});

User.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
});

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = User;
