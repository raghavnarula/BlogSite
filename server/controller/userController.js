// We store all the DB operation here
var userDB = require('../model/userModel');
const jwt = require('jsonwebtoken')
// const cookie = require('cookie-parser')

exports.create = (req,res)=>{
    const user = new userDB({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        date_joined:Date.now(),
    })

    user.save()
        .then(data=>{
            // console.log(data)
            res.json(data)
        })
        .catch((err)=>{
            // console.log(err)
            res.json(err)
        })
}

// Find User is in DB or Not
// If in DB then redirect else display Incorrect Password
exports.find = async (req,res)=>{
    const user_id = req.params.userid
    
    const userData = await userDB.findById(Object(user_id)).exec()
    res.json(userData)

}   

// exports.userProfile = async (req,res)=>{

// }

exports.all = (req,res)=>{
    userDB.find()
        .then(
            user=>res.send(user)
        )
        .catch((err)=>{
            res.send(err)
        })
    }

exports.drop = (req,res)=>{
    userDB.collection.drop()
    .then((data)=>{
        res.send(data)
    })
}

exports.cookieRead = (req,res,next) =>{
    const token = req.cookies.Token;
    // console.log(token)
    if (token==undefined){
        res.redirect('/login')
    }
    
    else{
        
        try {
            const verified = jwt.verify(token, process.env.secret_key);
            if(verified._id){
                next()
            }else{
                // Access Denied
                res.redirect('/login')
            }
        } catch (error) {
            // Access 
            // console.log(error.name,"---")
            res.locals.err = error.name
            next()
        }
    }
}

exports.login = async (req,res)=>{
    const{username,password} = req.body

    // If record found in DB
    const user = await userDB.findOne({username:username}).exec()
    if (user){
        // console.log(user)
        token = jwt.sign({_id:user._id},process.env.secret_key,{expiresIn:'15d'})
        res.cookie("Token",token)
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
}

exports.updateUser = (req,res)=>{
    const userid = req.params.userid
    userDB.findByIdAndUpdate(Object(userid),req.body)
    .then((userInfo)=>{
        res.json(userInfo)
    })
    .catch((err=>{
        res.send(err)
    }))
}

