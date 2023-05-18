const blogDB = require('../model/blogModel')
const userDB = require('../model/userModel')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const fs = require('fs')
const moment = require('moment')

async function resizeImage(image_name) {
    try {
    await sharp(`assets/img/blogs/${image_name}`)
        .resize({
          width: null,
          height: 250
        })
        .toFile(`assets/img/blogUpdated/${image_name}`);
        // fs.unlink(`assets/img/${image_name}`)
    } catch (error) {
      console.log(error);
}
}

exports.blogCreate = async (req,res) => {

    const user = jwt.verify(req.cookies.Token,process.env.secret_key)
    user_data = await userDB.findById(Object(user._id)).exec()
    author_name = user_data.username

    // Resizing image to save to img/updated/
    resizeImage(req.file.filename)

    const blog = new blogDB({
        author_id:user._id,
        title:req.body.title,
        content:req.body.content,
        date_posted:moment().format('MMMM Do YYYY, h:mm:ss a'),
        author_name: author_name,
        image:req.file.filename,
    })

    blog.save()
    .then((data)=>{
        // res.json(data)
        res.redirect('/')
    })
    .catch((err)=>{
        res.json(err)
    })
}

exports.editBlog = async (req,res)=>{
    const blogid = req.params.blogid

    // See if the User has sent any file or not..
    if (req.file != undefined){
        resizeImage(req.file.filename)
        try{

            await blogDB.findByIdAndUpdate(Object(blogid),{
                image:req.file.filename,
                date_posted:moment().format('MMMM Do YYYY, h:mm:ss a'),
                title:req.body.title,
                content:req.body.content
            })
            res.redirect('/')
        }
        catch(err){
            res.send(err)
        }
    }
    
    else{

        try{

            await blogDB.findByIdAndUpdate(Object(blogid),{
                date_posted:moment().format('MMMM Do YYYY, h:mm:ss a'),
                title:req.body.title,
                content:req.body.content
            })
            res.redirect('/')
        }
        catch(err){
            res.send(err)
        }
        
    }
}

exports.allBlogs = (req,res)=>{
        blogDB.find()
            .then((data)=>
                res.json(data)
            )
            .catch((err)=>{
                res.json(err)
            })
}

exports.findBlogsByAuthor = (req,res)=>{

    const userid= req.params.userid;
    blogDB.find({author_id:userid})
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })  
}

exports.blogDB_drop = (req,res)=>{
    blogDB.collection.drop()
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })

}

exports.deleteBlog = (req,res)=>{
    const blog_id = req.body._id
    blogDB.deleteOne({_id:blog_id})
}


exports.test = async (req,res)=>{
    const user = jwt.verify(req.cookies.Token,process.env.secret_key)
    // console.log(user._id)
    author_name =  await userDB.findById(Object(user._id)).exec()
    res.json(author_name.username)
}

exports.findBlog = async (req,res)=>{
    const blog = await blogDB.findById(Object(req.params.blogid)).exec()
    res.json(blog)
}

exports.deleteOneBlog = async (req,res)=>{
    try{
        data = await blogDB.deleteOne({_id: Object(req.params.blogid)}).exec()
        // res.json(data) // redirect to home
        res.redirect('/')
    }
    catch (error) {
        res.send(error)
    }
}

exports.saveBlog = async (req,res)=>{
    const Token = req.cookies.Token;
    const user = jwt.verify(req.cookies.Token,process.env.secret_key)
    try{

        const userData = await userDB.findByIdAndUpdate( Object(user._id),{ $push:{savedPosts:req.params.blogid} },{new:true})
        res.send(userData)
    }
    catch(err){
        res.send(err)
    }
}

exports.unsaveBlog = async (req,res)=>{
    const Token = req.cookies.Token;
    const user = jwt.verify(req.cookies.Token,process.env.secret_key)
    try{
        const userData = await userDB.findByIdAndUpdate( Object(user._id),{ $pull:{savedPosts:req.params.blogid} },{new:true})
        res.send(userData)
    }
    catch(err){
        res.send(err)
    } 
}


exports.upvoteDownvote = async (req,res)=>{
    // see which user upvoted also update the total count for each blog
    const Token = req.cookies.Token;
    const user = jwt.verify(req.cookies.Token,process.env.secret_key)

    try{
        const upvote = req.body.upvote
        const downvote = req.body.downvote
        const result = await blogDB.findByIdAndUpdate(Object(req.params.blogid),{$inc:{likes:upvote+downvote}},{new:true}).exec()
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
}