const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

const verify = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json({ msg: 'Access denied.' })
    
        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedUser)
        const user = await User.findById(decodedUser.id);
    
        if(!user){
            return res.status(401).json({ msg: 'Access denied 1.' })
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({ msg: 'Invalid token.' })
        }
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({ msg: 'Token Expired' })
        }

        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}

module.exports = verify;