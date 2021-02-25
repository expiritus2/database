const CustomError = require('./custom-error');

class NotFoundError extends CustomError {
    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(message, fields) {
        return [{ message: 'Not Found' }];
    }
}

module.exports = NotFoundError;