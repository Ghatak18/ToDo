const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { use } = require('../routes/auth.route');
const {Schema} = mongoose



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String,
        default: ""
    },
    refreshToken:{
        type:String
    }
},{
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        this.password = await bcrypt.hash(this.password,10);
        next();    
    } catch(error){
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
}



const User = mongoose.model('User', userSchema);
module.exports = User;