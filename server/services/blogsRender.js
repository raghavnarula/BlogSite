const userDB = require('../model/userModel')
const blogDB = require('../model/blogModel')
const axios = require('axios')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

exports.blogView = async (req,res)=>{

    const token = req.cookies.Token;
    const verified = jwt.verify(token,process.env.secret_key)

    axios.get(`http://localhost:${process.env.PORT}/api/blog/${req.params.blogid}`)
    .then((blogDataResponse)=>{
        axios.get(`http://localhost:${process.env.PORT}/api/user/find/${blogDataResponse.data.author_id}`)
        .then((authorDataResponse)=>{
            res.render("pages/singleBlog",{blogData:blogDataResponse.data,
                                            author_id_cookie:verified._id,
                                            authorData:authorDataResponse.data})
        })
        // res.send("Page")
    })
    .catch((error)=>{
        res.send(error)
    })
}

// exports.blogPostRender = (req,res)=>{
//     axios.get(`http://localhost:${process.env.PORT}/api/blog/:blogid`)
//     .then((response)=>{
//         res.send("Pagal")
//         // console.log(response.data)
//         // res.render("pages/singleBlog",{data:response.data})
//         // res.send("Page")
//     })
//     .catch((error)=>{
//         res.send(error)
//     })
// }

exports.blogCreate = (req,res)=>{
    res.render('pages/blogs/blogCreate')
}