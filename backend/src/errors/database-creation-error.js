const CustomError = require('./custom-error');

class DatabaseCreationError extends CustomError {
    constructor() {
        super('Error creation in database');

        this.reason = 'Error creation in database';
        this.statusCode = 400;

        Object.setPrototypeOf(this, DatabaseCreationError.prototype);
    }

    serializeErrors(message, fields) {
        return [{ message: this.reason }];
    }
}

module.exports = DatabaseCreationError;