const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    content: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
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

//find return array
//findOne return the first match
module.exports = mongoose.model("Review", schema);
