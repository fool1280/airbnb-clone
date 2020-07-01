const User = require("../models/user");
const AppError = require("../utils/appError");
const passport = require("../oauth/index");

exports.loginWithEmail = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError(400, "Email and password are required"));
    }
    const user = await User.loginWithEmail(email, password);
    if (!user) {
        return next(new AppError(401, "Wrong email or password"));
    }
    const token = await user.generateToken();
    res.json({
        status: "ok",
        data: {
            user: user,
            token: token,
        },
    });
};

exports.logoutUser = async (req, res) => {
    try {
        console.log(req.user);
        const token = req.headers.authorization.replace("Bearer ", "");
        req.user.tokens = req.user.tokens.filter((e) => e !== token);
        await req.user.save();
        console.log(req.user);
        res.json({
            status: "success",
            data: {
                user: req.user,
                token: "",
            },
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.loginFacebook = passport.authenticate("facebook", { scope: ["email"] });

exports.facebookAuthHandler = function (req, res, next) {
    passport.authenticate("facebook", async function (err, profile) {
        // if email exists in database: => login and return token
        // if not, create a new user and return token
        try {
            const { email } = profile._json;
            const name =
                profile._json.first_name + " " + profile._json.last_name;
            const user = await User.findOneOrCreate({ email, name });
            const token = await user.generateToken();
            return res.redirect(`https://localhost:3000/?token=${token}`);
        } catch (error) {
            return res.redirect("https://localhost:3000/login");
        }

        ///if user successfully login => redirect to front-end page
        //else,
    })(req, res, next);
};

exports.loginGoogle = passport.authenticate("google", {
    scope: ["email", "profile"],
});

exports.googleAuthHandler = function (req, res, next) {
    passport.authenticate("google", async function (err, profile) {
        try {
            const { email } = profile._json;
            const name = profile.name.givenName + " " + profile.name.familyName;
            console.log(email, " ", name);
            const user = await User.findOneOrCreate({ email, name });
            const token = await user.generateToken();
            return res.redirect(`https://localhost:3000/?token=${token}`);
        } catch (error) {
            return res.redirect("https://localhost:3000/login");
        }
    })(req, res, next);
};
