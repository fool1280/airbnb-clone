const Tag = require("../models/tag");

const Exp = require("../models/experience");

exports.getExperiences = async (req, res, next) => {
    const data = await Exp.find().populate("tags").populate("host");
    res.status(200).json({
        status: "ok",
        data: data,
    });
};

exports.getExpByTag = async (req, res, next) => {
    try {
        const q = await Tag.findOne({ tag: req.params.tag });
        if (!q) {
            throw new Error("Tag is not found");
        }
        const data = await Exp.find({ tags: q._id }).populate("tags");
        console.log(data);
        if (!data) {
            throw new Error("Experience is not found");
        }
        res.status(200).json({
            status: "success",
            data: data,
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.createExperience = async (req, res, next) => {
    try {
        const {
            title,
            description,
            tags,
            duration,
            location,
            price,
            groupSize,
            languages,
            items,
        } = req.body;
        if (
            !title ||
            !description ||
            !tags ||
            !duration ||
            !groupSize ||
            !location ||
            !price ||
            !languages
        ) {
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
            duration,
            groupSize,
            location,
            price,
            languages,
            items,
        });
        res.status(201).json({
            status: "ok",
            data: exp,
        });
    } catch (error) {
        res.send("error");
    }
};
