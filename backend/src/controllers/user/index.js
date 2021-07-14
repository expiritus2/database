const User = require('../../models/user');
const BadRequestError = require('../../errors/bad-request-error');

class UserController {
    constructor(user, body) {
        this.user = user;
        this.displayName = body.displayName;
        this.oldPassword = body.oldPassword;
        this.newPassword = body.newPassword;
    }

    update() {
        return new Promise(async (resolve, reject) => {
            const storedUser = await User.findByPk(this.user.id);

            if (this.displayName) {
                storedUser.displayName = this.displayName;
            }

            if (this.oldPassword && this.newPassword) {
                if (storedUser.validPassword(this.oldPassword)) {
                    storedUser.password = User.bcryptPassword(this.newPassword);
                } else {
                    return reject(new BadRequestError('Old password not valid'));
                }
            }

            const updatedUser = await storedUser.save();

            resolve(updatedUser);
        });
    }
}

module.exports = UserController;