const express = require('express');
const authRouter =  express.Router();
const {test, registerUser}  = require('../controllers/auth.controller.js')
const upload =  require('../middlewares/multer.middleware.js')


authRouter.get("/hi",test)
authRouter.post('/register',upload.single('avatar'),registerUser)


module.exports = authRouter;