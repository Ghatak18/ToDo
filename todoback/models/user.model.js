const mongoose = require('mongoose')
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

const User = mongoose.model('User', userSchema);
module.exports = User;