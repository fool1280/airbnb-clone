var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const AppError = require("./utils/appError");

const mongoose = require("mongoose");

var indexRouter = require("./routes/indexRoute");
var usersRouter = require("./routes/userRoute");
var authRouter = require("./routes/authRoute");
var expRouter = require("./routes/expRoute");
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.DB, {
        // some options to deal with deprecated warning, you don't have to worry about them.
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/experiences", expRouter);

app.route("*").all(function (req, res, next) {
    let error = new Error("Not Found");
    error.statusCode = 404;
    error.status = "fail";
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    /*
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");*/
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message || "Something wrong";
    if (err) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    }
});

module.exports = app;
