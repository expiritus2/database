const CustomError = require('./custom-error');

class NotAuthorizedError extends CustomError {
    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(message, fields) {
        return [{ message: 'Not authorized' }];
    }
}

module.exports = NotAuthorizedError;