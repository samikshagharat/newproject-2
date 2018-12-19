let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    auther: {
        type: String,
        required: true
    },
    body: {
        type: String,
    }
});
let Article = module.exports = mongoose.model('Article', articleSchema);