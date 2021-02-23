class Logger {
    static log(...messages) {
        if (process.env.NODE_ENV === 'development') {
            console.log(...messages);
        }
    }

    static info(...messages) {
        if (process.env.NODE_ENV === 'development') {
            console.info(...messages);
        }
    }

    static warn(...messages) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(...messages);
        }
    }

    static error(...messages) {
        if (process.env.NODE_ENV === 'development') {
            console.error(...messages);
        }
    }

    static debug(...messages) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(...messages);
        }
    }
}

module.exports = Logger;
