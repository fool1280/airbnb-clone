const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.loginRequired = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "fail",
                error: "Unauthorized",
            });
        }
        const token = authorization.replace("Bearer ", "");
        const { _id } = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(_id);
        let check = user.tokens.findIndex((i) => i == token);
        if (!user || check == -1) {
            return res.status(401).json({
                status: "fail",
                error: "Unauthorized",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.hostRequired = (req, res, next) => {
    if (req.user.type !== "host") {
        return res.status(401).json({
            status: "fail",
            message: "host required",
        });
    }
    next();
};
