const cloudinary = require('cloudinary')
const fs = require('fs')


cloudinary.config({ 
    cloud_name: "ddcpulkwg", 
    api_key: 181789527211729, 
    api_secret: "f0QAQdng7R0mno6fae2ZgcuNhKI"
  });

  const uploadCloudinary = async(localfilepath) =>{
    let avatarDefault ='https://res.cloudinary.com/ddcpulkwg/image/upload/v1732354621/836_ya4z95.jpg';

    // if(!localfilepath) {
    //     console.log("no file to upload");
    //     return null;
    // }
    
    try {
        const response = await cloudinary.uploader.upload(localfilepath || avatarDefault, {
            resource_type: "auto"
        })
        console.log(response);
        if(localfilepath){
            fs.unlinkSync(localfilepath);
        }
        return response;
    
    } catch (error) {
        console.log(error)
        if(localfilepath){
            fs.unlinkSync(localfilepath);
        }
        
        return null;
    }
}

module.exports = uploadCloudinary;