const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    slug: { type: String, slug: "title", unique: true },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    posted_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: null}
});

module.exports = mongoose.model("Post", postSchema);