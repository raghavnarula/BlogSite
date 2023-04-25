const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:String,
    password:String,
    profile_photo:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
    },
    highlight:{
        type:String,
        default:" ",
    },
})

const User = mongoose.model('User',UserSchema)
module.exports = User