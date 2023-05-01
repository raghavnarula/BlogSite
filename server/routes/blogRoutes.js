const express = require('express');
const route = express.Router();
const blogController = require('../controller/blogController')
const blogService = require('../services/blogsRender')
//Services
route.get('/blog/:blogid',blogService.blogView)
route.get('/blogs/create',blogService.blogCreate)

// API's
route.post('/api/blog/create/',blogController.blogCreate)
route.get('/api/blog/user-blogs/:userid',blogController.findBlogsByAuthor)
route.delete('/api/blog/drop/',blogController.blogDB_drop)
route.get('/api/blog/all/',blogController.allBlogs)
route.get('/api/user/test/',blogController.test)
route.get('/api/blog/:blogid',blogController.findBlog)

route.delete('/api/blog/:blogid',blogController.deleteOneBlog)

// exports
module.exports = route;