const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);