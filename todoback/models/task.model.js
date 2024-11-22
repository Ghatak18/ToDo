const mongoose = require('mongoose')
const {Schema} = mongoose

const taskSchema = new mongoose.Schema({
    desc:{
        type:String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    timestamps:true
})

const Task = new mongoose.model("Task",taskSchema)
module.exports = Task