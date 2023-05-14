const express = require('express');
const route = express.Router();
const blogController = require('../controller/blogController')
const blogService = require('../services/blogsRender')
const blogmiddleware = require('../middleware/blogmiddleware')

//Services
route.get('/blog/:blogid',blogService.blogView)
route.get('/blogs/create',blogService.blogCreate)
// route.get('/blog/6456c1924c5a309edf7fe444/edit',blogService.editBlog)
route.get('/blog/:blogid/edit',blogService.editBlog)

// API's
route.post('/api/blog/create/',blogmiddleware.upload.single("image"),blogController.blogCreate)

route.get('/api/blog/user-blogs/:userid',blogController.findBlogsByAuthor)
route.get('/api/blog/all/',blogController.allBlogs)
route.get('/api/user/test/',blogController.test)
route.get('/api/blog/:blogid',blogController.findBlog)
route.post('/api/blog/:blogid/save',blogController.saveBlog)
route.post('/api/blog/:blogid/edit/',blogmiddleware.upload.single("image"),blogController.editBlog)

route.delete('/api/blog/drop/',blogController.blogDB_drop)
route.get('/api/blog/delete/:blogid',blogController.deleteOneBlog)

// exports
module.exports = route;