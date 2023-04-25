const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    commentor:String,
    date_posted:Date,
    comment:String,
    blog_commented_on:String
})

const Comment = mongoose.model('Comment',CommentSchema)
module.exports = Comment