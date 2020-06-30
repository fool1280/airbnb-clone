const Review = require("../models/review");
const Exp = require("../models/experience");

exports.updateReview = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const experienceId = req.params.id;
        const experience = await Exp.findById(req.params.id);
        if (!experience) {
            throw new Error("Experience not found");
        }
        const { content, rating, title } = req.body;
        const review = await Review.findOneAndUpdate(
            { user: userId, experience: experienceId },
            { content, rating, title }
        );
        res.json({
            status: "success",
            data: review,
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.createReview = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const experienceId = req.params.id;
        const experience = await Exp.findById(req.params.id);
        if (!experience) {
            throw new Error("Experience not found");
        }
        if (JSON.stringify(experience.host) == JSON.stringify(userId)) {
            throw new Error("Owner is unauthorized to review");
        }
        const check = await Review.exists({
            user: userId,
            experience: experienceId,
        });
        if (check) {
            return res.json({
                status: "fail",
                error: "Already review",
            });
        }
        const review = await Review.create({
            ...req.body,
            user: userId,
            experience: experienceId,
        });
        res.status(201).json({ status: "ok", data: review });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.getAllReview = async (req, res, next) => {
    try {
        const experienceId = req.params.id;
        if (!experienceId) {
            throw new Error("Experience not found");
        }
        const experience = await Exp.findById(req.params.id);
        if (!experience) {
            throw new Error("Experience not found");
        }
        const data = await Review.find({ experience: experienceId });
        res.json({
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

exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findOneAndDelete({
            user: req.user._id,
            experience: req.params.id,
        });
        if (!review) {
            throw new Error("Review not fount");
        }
        res.json({
            status: "success",
            data: review,
        });
    } catch (error) {
        res.json({
            status: "fail",
            error: error.message,
        });
    }
};
