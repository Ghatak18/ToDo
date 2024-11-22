const express = require('express');
const authRouter =  express.Router();
const {test}  = require('../controllers/auth.controller.js')

authRouter.get("/hi",test
)


module.exports = authRouter;