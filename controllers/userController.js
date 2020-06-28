const User = require("../models/user");

exports.createUser = async (req, res, next) => {
    try {
        const { email, name, password, type, intro } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({
                status: "fail",
                error: "Email, name, and password are required",
            });
        }
        const user = await User.create({
            email: email,
            name: name,
            password: password,
            type: type || "normal",
            intro: type == "host" ? intro : "",
        });

        res.status(201).json({
            status: "ok",
            data: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Error",
            error: err.message,
        });
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const data = await User.find();
        res.json({
            status: "success",
            data: data,
        });
    } catch (err) {
        res.json({
            status: "fail",
            error: err.message,
        });
    }
};

exports.getMyProfile = async (req, res) => {
    try {
        res.json({
            status: "ok",
            data: req.user,
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    const fields = Object.keys(req.body);
    fields.map((field) => {
        return (user[field] = req.body[field]);
    });
    user.save();
    res.json({
        status: "success",
        data: user,
    });
};

exports.logoutUser = async (req, res) => {
    const user = req.user;
    user.tokens.pop();
    user.save();
    res.json({
        status: "success",
        data: user,
    });
};
