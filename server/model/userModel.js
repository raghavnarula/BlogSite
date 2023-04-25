const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    password:String,
    profile_photo:String,
    highlight:String,
})

const User = mongoose.model('User',UserSchema)
module.exports = User