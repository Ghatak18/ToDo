const express = require('express');
const authRouter =  express.Router();
const {test, registerUser, logoutUser, loginUser}  = require('../controllers/auth.controller.js')
const verify = require('../middlewares/auth.middleware.js')
const upload =  require('../middlewares/multer.middleware.js')


authRouter.get("/hi",test)
authRouter.post('/register',upload.single('avatar'),registerUser)
authRouter.post('/login',loginUser)

//seured routes
authRouter.post('/logout', verify,logoutUser)

module.exports = authRouter;