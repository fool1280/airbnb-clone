const Tag = require("../models/tag");

const Exp = require("../models/experience");

const AppError = require("../utils/appError");

exports.getExperiences = async (req, res, next) => {
    /*
    const data = await Exp.find().populate("tags").populate("host");
    res.status(200).json({
        status: "ok",
        data: data,
    });*/
    const filters = { ...req.query };
    const paginationKeys = ["limit", "page", "sort"];
    paginationKeys.map((el) => delete filters[el]);
    console.log(filters);
    if (Array.isArray(filters["tags"])) {
        let temp = filters["tags"]; //why can I do filters[tags]
        filters["tags"] = {
            $in: temp,
        };
    }
    let query = Exp.find(filters);
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        console.log(sortBy);
        query.sort(sortBy);
    } else {
        query.sort("-createdAt");
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    const countExperiences = await Exp.find(filters).countDocuments();
    if (req.query.page && skip > countExperiences)
        return next(new AppError(400, "Page number out of range"));
    query = query.skip(skip).limit(limit);
    const exps = await query;
    if (!exps.length) {
        //Because find returns a cursor
        return next(new AppError(404, "Experience not found"));
    }
    res.json({ status: "success", data: exps, count: countExperiences });
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
