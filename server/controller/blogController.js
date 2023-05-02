const blogDB = require('../model/blogModel')
const userDB = require('../model/userModel')
const jwt = require('jsonwebtoken')

exports.blogCreate = async (req,res) => {

    const user = jwt.verify(req.cookies.Token,process.env.secret_key)
    user_data = await userDB.findById(Object(user._id)).exec()
    author_name = user_data.username
    const blog = new blogDB({
        author_id:user._id,
        title:req.body.title,
        content:req.body.content,
        date_posted:Date.now(),
        author_name: author_name
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

// exports.editBlog = (req,res)=>{
//     const blog_id = req.body._id
//     blogDB.findOneAndUpdate({id:blog_id},{})
// }

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
        res.json(data) // redirect to home
    }
    catch (error) {
        res.send(error)
    }
}