const mongoose = require("mongoose")


const connetDb =  async () =>{
    
   try {
     await mongoose.connect("mongodb+srv://Supratik:Supratik18@todo.pzsqy.mongodb.net/?retryWrites=true&w=majority&appName=ToDo")
     console.log("Connected to MongoDB")
   } catch (error) {
    console.log(error)
   }
}
module.exports = connetDb 