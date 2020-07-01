const passport = require("passport");
const facebookStrat = require("./facebook");
const googleStrat = require("./google");

passport.use(facebookStrat);
passport.use(googleStrat);

module.exports = passport;
