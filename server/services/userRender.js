const userDB = require('../model/userModel')
const axios = require('axios')
const mongoose = require('mongoose')


exports.homeRoute = async (req,res)=>{
    if(res.locals.err){
        // console.log("User must login again")
        res.render('pages/login')
    }
    else{
        // Query request
        axios.get(`http://localhost:${process.env.PORT}/api/blog/all`)
        .then((response)=>{
            // console.log(response.data)
            author_list = []

            res.render("pages/index",{data:response.data})
            // res.send("Page")
        })
        .catch((error)=>{
            res.send(error)
        })
    }
}

exports.user = (req,res)=>{
    const id = req.query.id
    // console.log(id)
    userDB.findById(id)
    .then((data)=>{
        // console.log(data)
        res.render('pages/user',{user:data})
    })   
}

exports.loginRender = (req,res)=>{
    
    res.render('pages/login')
}


exports.userProfile = async (req,res)=>{
    try{
        const user_info = await axios.get(`http://localhost:${process.env.PORT}/api/user/find/${req.params.userid}`)
        const user_blogs = await axios.get(`http://localhost:${process.env.PORT}/api/blog/user-blogs/${req.params.userid}`)
        res.render('pages/userProfilePage',{userData:user_info.data,userBlogs:user_blogs.data})
    }
    catch (err) {
        res.send(err)
    }

}