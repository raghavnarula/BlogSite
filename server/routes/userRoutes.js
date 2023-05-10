const express = require('express');
const router = express.Router();
const services = require('../services/userRender')
const userController = require('../controller/userController')
const usermiddleware = require('../middleware/usermiddleware')

router.get('/',userController.cookieRead,services.homeRoute);
router.get('/login',services.loginRender)
router.get('/user/:userid',services.userProfile);

//API's
router.post('/api/user/create',userController.create) // create a user
router.get('/api/user/find/:userid',userController.find) // find a user 
router.get('/api/user/all',userController.all) // see all user's in the DB
router.delete('/api/user/drop',userController.drop)
router.post('/api/user/login',userController.login)
router.get('/api/user/cookie',userController.cookieRead)
router.post('/api/user/edit/:userid',usermiddleware.upload.single("profile_photo"),userController.updateUser)

module.exports = router;