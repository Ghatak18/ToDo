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
    },
    priority:{
        type:Number,
        required: true,
        enum: [1,2,3],
        default: 1

    },
    isCompleted:{
        type:Boolean,
        default: false
    }
},{
    timestamps:true
})

const Task = new mongoose.model("Task",taskSchema)
module.exports = Task