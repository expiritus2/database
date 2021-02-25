const CustomError = require('./custom-error');

class UnexpectedError extends CustomError {
    constructor(message) {
        super(message);

        Object.setPrototypeOf(this, UnexpectedError.prototype);
    }

    serializeErrors(message, fields) {
        return [{ message: this.message }];
    }
}

module.exports = UnexpectedError;