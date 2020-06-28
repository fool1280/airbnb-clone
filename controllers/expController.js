const { ExpectationFailed } = require("http-errors");
const Tag = require("../models/tag");

const Exp = require("../models/experience");

exports.getExperiences = async (req, res, next) => {
    const data = await Exp.find().populate("tags");
    res.status(200).json({
        status: "ok",
        data: data,
    });
};

exports.createExperience = async (req, res, next) => {
    try {
        const { title, description, tags } = req.body;
        if (!title || !description || !tags) {
            return res.status(400).json({
                status: "fail",
                error: "title, description, and tags are required",
            });
        }
        const newArr = await Tag.convertToObject(tags);
        console.log(newArr);
        const exp = await Exp.create({
            title,
            description,
            tags: newArr,
            host: req.user._id,
        });
        res.status(201).json({
            status: "ok",
            data: exp,
        });
    } catch (error) {
        res.send("error");
    }
};
