var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const AppError = require("./utils/appError");
const passport = require("passport");

const mongoose = require("mongoose");

var indexRouter = require("./routes/indexRoute");
var usersRouter = require("./routes/userRoute");
var authRouter = require("./routes/authRoute");
var expRouter = require("./routes/expRoute");
const { errorController } = require("./controllers/errorController");
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

app.use(passport.initialize());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/experiences", expRouter);

app.route("*").all(function (req, res, next) {
    next(new AppError(404, "URL not found"));
});

// error handler
app.use(errorController);

module.exports = app;
