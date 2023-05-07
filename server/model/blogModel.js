const mongoose = require('mongoose')    

const BlogSchema = mongoose.Schema({
    author_id:String, // id of the User would come...
    title:String,
    content:String,
    date_posted:String,
    // image:{
    //     type:String,
    //     default:"https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg"
    // }
    image:String
})

const Blog = mongoose.model('Blog',BlogSchema)
module.exports = Blog