//Error is built in class

//AppError inherit all features from Error
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        // all errors using this class are operational errors. We need this boolean to check before sending response. We will use it later
        this.isOperational = true;
        // create a stack trace for debugging (Error obj, void obj to avoid stack polution)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
