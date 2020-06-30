const mongoose = require("mongoose");
const Exp = require("../models/experience");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 0,
        max: 5,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    experience: {
        type: mongoose.Schema.ObjectId,
        ref: "Exp",
        required: true,
    },
});

schema.post("save", async function () {
    //this === review doc (review instance)
    await this.constructor.calculateAverage(this.experience);
});

schema.statics.calculateAverage = async function (id) {
    //this refer to Review model
    const stats = await this.aggregate([
        {
            $match: { experience: id },
        },
        {
            $group: {
                _id: "$experience",
                nRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
        // experience: adasdas
    ]);
    console.log(stats);
    await Exp.findByIdAndUpdate(id, {
        nRating: stats.length > 0 ? stats[0].nRating : 0,
        avgRating: stats.length > 0 ? stats[0].avgRating : 0,
    });
};

//find return array
//findOne return the first match
module.exports = mongoose.model("Review", schema);
