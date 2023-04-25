const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    author_id:String, // id of the User would come...
    title:String,
    content:String,
    date_posted:Date,
})

const Blog = mongoose.model('Blog',BlogSchema)
module.exports = Blog