const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.loginWithEmail = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: "fail",
            error: "Email and password are required",
        });
    }
    const user = await User.loginWithEmail(email, password);
    if (!user) {
        return res.status(401).json({
            status: "fail",
            error: "Wrong email or password",
        });
    }
    /* This is wrong because user can have multiple sessions.
    //Token Expires
    //1) Create a new one // IF NOT: reuse the newest oken
    let n = user.tokens.length;
    if (n > 0) {
        let currentToken = user.tokens[n - 1];
        try {
            const { _id } = jwt.verify(currentToken, process.env.SECRET);
            return res.json({
                status: "ok",
                data: {
                    user: user,
                    token: currentToken,
                },
            });
        } catch (error) {
            const token = await user.generateToken();
            return res.json({
                status: "ok",
                data: {
                    user: user,
                    token: token,
                },
            });
        }
    }*/
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
