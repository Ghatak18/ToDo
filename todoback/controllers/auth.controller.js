
const User = require('../models/user.model.js')
const uploadCloudinary = require('../utils/cloudinary.js')

const test = (req,res) =>{
    res.send("Hello from test route")
}

const getRefresToken = async(userid) => {
   try {
     const user = await User.findById(userid);
     if(!user) return null;
     const refreshToken = user.generateRefreshToken()
 
     user.refreshToken  =refreshToken
     await user.save({validateBeforeSave: false})
 
 
     return refreshToken
   } catch (error) {
    console.log(error)
   }

}

const registerUser = async(req,res) =>{
    
   try {
     const{name, email, password} = req.body;
 
     const ifExisting = await User.findOne({email:email});
     if(ifExisting){
         return res.status(400).send({message: "Email already exists"})
     }
 
     let avatarLocalPath=''
     if(req.file){
         avatarLocalPath = req.file.path;
     }
     console.log(avatarLocalPath)
     const cloudinaryResponse = await uploadCloudinary(avatarLocalPath);
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

     const accessToken = createdUser.generateAccessToken()
     const refreshToken = await getRefresToken(createdUser._id) 
     console.log(refreshToken)

     const options = {
        httpOnly: true,
        secure: true
     }

     return res.status(201)
     .cookie("accessToken", accessToken,options)
     .send({message: "User created successfully", user:createdUser, refreshToken: refreshToken})
   } catch (error) {
    console.log(error)
   }
};

const loginUser = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).send({message: "User not found"})
            }
        const isValidPassword = await user.isPasswordCorrect(password);
        if(!isValidPassword){
            return res.status(400).send({message: "Invalid password"})
            }
        const accessToken = user.generateAccessToken()
        const refreshToken = await getRefresToken(user._id)
        const options = {
            httpOnly: true,
            secure: true
        }
        res.status(200)
        .cookie("accessToken", accessToken, options)
        .send({
            message: "User logged in successfully",
            refreshToken: refreshToken
        })

    }catch(error){
        console.log(error)
    }
}

const logoutUser = async(req,res) =>{
    // delete refresh token from database
    //clear cookie

    await User.findByIdAndUpdate(req.user._id, {
        $unset:{
            refreshToken:1
        }
    },{
        new:true
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.clearCookie("accessToken", options).send({message: "Logged out successfully"})
}

const refreshAccessToken = async(req, res) =>{
    const refreshToken = req.body;
    const isValid = await User.findOne({
        refreshToken: refreshToken
    })

    if(!isValid){
        return res.status(400).send({message: "Invalid refresh token"})
    }
    const options = {
        httpOnly: true,
        secure: true
    }

    const accessToken = isValid.generateAccessToken()

    return res.cookie("accessToken", accessToken, options)
                .send({
                    message: "Access token refreshed successfully",
                })
}

module.exports = {test,
    registerUser,
    loginUser,
    logoutUser
};

