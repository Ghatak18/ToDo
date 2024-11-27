const express = require('express');
const authRouter =  express.Router();
const {test, registerUser, logoutUser, loginUser}  = require('../controllers/auth.controller.js')
const verify = require('../middlewares/auth.middleware.js')
const upload =  require('../middlewares/multer.middleware.js')
const cors = require('cors')

const corsOptions = {
    origin: '*', // Allow all origins (for development)
    methods: 'GET,POST,PUT,DELETE', // Allow specific methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
    preflightContinue: false, // Set to false to send the response back to the client directly
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  authRouter.use(cors(corsOptions));

authRouter.get("/hi",test)
authRouter.post('/register',upload.single('avatar'),registerUser)
authRouter.post('/login',loginUser)

//seured routes
authRouter.post('/logout', verify,logoutUser)

module.exports = authRouter;