// We store all the DB operation here
var userDB = require('../model/userModel');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const sharp = require('sharp')

async function resizeImage(image_name) {
    try {
    await sharp(`assets/img/users/${image_name}`)
        .resize({
          width: 200,
          height: 200
        })
        .toFile(`assets/img/usersUpdated/${image_name}`);
    } catch (error) {
      console.log(error);
}
}


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
            res.redirect('/login')
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

      const { username, password } = req.body;
      // If record found in DB
      const user = await userDB.findOne({ username: username }).exec();
      if (user) {
        // console.log(user)
        token = jwt.sign({ _id: user._id }, process.env.secret_key, {
          expiresIn: "15d",
        });
        res.cookie("Token", token);
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
}

exports.updateUser = (req,res)=>{
    // console.log(req.file.filename)
    const userid = req.params.userid

    if (req.file == undefined){

        userDB.findByIdAndUpdate(Object(userid),req.body)
        .then((userInfo)=>{
            res.redirect(`/user/${req.params.userid}`)
        })
        .catch((err=>{
            res.send(err)
        }))
    }
    else{
        resizeImage(req.file.filename)
        userDB.findByIdAndUpdate(Object(userid),{
            profile_photo:req.file.filename,
            username:req.body.username,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            highlight:req.body.highlight
        }).then((userData)=>{
            console.log(userData)
            res.redirect(`/user/${req.params.userid}`)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    
}

exports.logout = (req,res) =>{
    res.clearCookie('Token')
    res.redirect('/login')
}