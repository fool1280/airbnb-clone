exports.errorController = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message || "Something wrong";
    if (err) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            //stack: err.stack,
        });
    }
};
