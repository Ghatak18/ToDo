
const User = require('../models/user.model.js')
const uploadCloudinary = require('../utils/cloudinary.js')

const test = (req,res) =>{
    res.send("Hello from test route")
}

const registerUser = async(req,res) =>{
    
   try {
     const{name, email, password} = req.body;
 
     const ifExisting = await User.findOne({email:email});
     if(ifExisting){
         return res.status(400).send({message: "Email already exists"})
     }
 
     let avatarLocalPath ='aaa';
 
     if(req.file){
         avatarLocalPath = req.file.path;
     }
     console.log(avatarLocalPath)
     const cloudinaryResponse = await uploadCloudinary(avatarLocalPath)
     console.log(cloudinaryResponse)
     const avatarCloudinary = cloudinaryResponse.secure_url
 
     const user = await User.create({
         name: name,
         email: email,
         password: password,
         avatar: avatarCloudinary
     })
     
     const createdUser = await User.findById(user._id).select("-password -refreshToken")
 
     if(!createdUser){
         return res.status(400).send({message: "User not created"})
     }
     return res.status(201).send({message: "User created successfully", user:createdUser})
   } catch (error) {
    console.log(error)
   }
};
module.exports = {test,
    registerUser
};

