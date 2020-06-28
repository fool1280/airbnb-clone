const mongoose = require("mongoose");
const Tag = require("../models/tag");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 100,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 1000,
            required: true,
        },
        host: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        tags: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Tag",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

/*
schema.pre("save", async function (next) {
    let arr = [...this.tags];
    let foo = arr.map(
        async (e) => await Tag.findOne({ tag: e.toLowerCase().trim() })
    );
    let result = Promise.all(foo);
    this.tag = result;
    next();
});
*/

module.exports = mongoose.model("Exp", schema);
