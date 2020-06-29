const Tag = require("../models/tag");

const Exp = require("../models/experience");

exports.hostExperience = async (req, res, next) => {
    try {
        const data = await Exp.find({ host: req.user._id });
        if (!data) {
            throw new Error("Expericence not found");
        }
        res.json({
            status: "succes",
            data: data,
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.hostUpdate = async (req, res, next) => {
    try {
        const exp = await Exp.findById(req.params.id);
        if (!exp) {
            throw new Error("Expericence not found");
        }
        if (JSON.stringify(exp.host) !== JSON.stringify(req.user._id)) {
            throw new Error("Unauthorize");
        }
        const fields = Object.keys(req.body);
        fields.map((field) => {
            exp[field] = req.body[field];
        });
        exp.save();
        res.json({
            status: "success",
            data: exp,
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.hostDelete = async (req, res, next) => {
    try {
        const exp = await Exp.findById(req.params.id);
        if (!exp) {
            throw new Error("Expericence not found");
        }
        if (JSON.stringify(exp.host) !== JSON.stringify(req.user._id)) {
            throw new Error("Unauthorize");
        }
        exp.remove();
        res.json({
            status: "success",
            data: exp,
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};
