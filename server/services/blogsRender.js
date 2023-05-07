const userDB = require('../model/userModel')
const blogDB = require('../model/blogModel')
const axios = require('axios')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require("multer");
const path = require("path");


exports.blogView = async (req,res)=>{

    const token = req.cookies.Token;
    const verified = jwt.verify(token,process.env.secret_key)

    axios.get(`http://localhost:${process.env.PORT}/api/blog/${req.params.blogid}`)
    .then((blogDataResponse)=>{
        axios.get(`http://localhost:${process.env.PORT}/api/user/find/${blogDataResponse.data.author_id}`)
        .then((authorDataResponse)=>{
            res.render("pages/blogs/singleBlog",{blogData:blogDataResponse.data,
                                            author_id_cookie:verified._id,
                                            authorData:authorDataResponse.data})
        })
        // res.send("Page")
    })
    .catch((error)=>{
        res.send(error)
    })
}

exports.editBlog = (req,res)=>{
    res.send("pagal")
    // res.render('pages/blogs/editBlog')
}


exports.blogCreate = (req,res)=>{
    res.render('pages/blogs/blogCreate')
}