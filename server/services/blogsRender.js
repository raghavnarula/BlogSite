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
                                            authorData:authorDataResponse.data,
                                            user:authorDataResponse.data})
        })
        // res.send("Page")
    })
    .catch((error)=>{
        res.send(error)
    })
}

exports.editBlog = (req,res)=>{

    axios.get(`http://localhost:${process.env.PORT}/api/blog/${req.params.blogid}`)
    .then((blogData)=>{
        axios.get(`http://localhost:${process.env.PORT}/api/user/find/${blogData.data.author_id}`)
        .then((userData)=>{
            res.render('pages/blogs/editBlog',{blogData:blogData.data,user:userData.data})
        })
        .catch((err)=>{
            res.send(err)
        })
    })
    .catch((err)=>{
        res.send(err)
    })
}

exports.blogCreate = (req,res)=>{
    const token = req.cookies.Token
    const verified = jwt.verify(token,process.env.secret_key)

    axios.get(`http://localhost:${process.env.PORT}/api/user/find/${verified._id}`)
    .then((userData)=>{
        res.render('pages/blogs/blogCreate',{user:userData.data})
    })
    .catch((err)=>{
        res.send(err)
    })
}