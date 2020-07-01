const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        profileFields: ["id", "email", "name", "picture"],
    },
    function (accessToken, refreshToken, profile, next) {
        console.log(profile);
        next(null, profile);
    }
);
