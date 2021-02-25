const CustomError = require('./custom-error');

class DatabaseConnectionError extends CustomError {
    constructor() {
        super('Error connecting to db');

        this.reason = 'Error connection to database';

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(message, fields) {
        return [{ message: this.reason }];
    }
}

module.exports = DatabaseConnectionError;