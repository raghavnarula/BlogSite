const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    password:String,
    profile_photo:{
        type:String,
        default:'userDefault.png'
    },
    highlight:{
        type:String,
        default:" ",
    },
    date_joined:Date,
})

const User = mongoose.model('User',UserSchema)
module.exports = User