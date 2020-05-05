var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

moodule.exports = mongoose.model("comment", commentSchema);