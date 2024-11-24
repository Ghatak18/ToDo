const mongoose = require('mongoose')
const Task  = require('../models/task.model.js')
const User = require('../models/user.model.js')

const test1 = async (req,res) => {
    return res.json({message: 'hi from the test route'})
}

const addTask = async (req,res) => {
    const {task,priority} = req.body
    if(!task){
        return res.status(400).json({message: 'Please enter a task'})
    }
    const addedtask = await Task.create({
        desc: task,
        user: req.user._id,
        priority: priority
    })

    if(!addedtask){
        return res.status(400).json({message: 'Task addition failed'})
    }

    return res.status(200)
                .json({
                    message: 'Task added successfully',
                    task: addedtask,
                })
}

const getAllTasks = async (req,res) => {
  try {
      const tasks = await Task.find({user: req.user._id})
      
      if(!tasks){
          return res.status(404).json({message: 'No tasks found'})
      }
      return res.status(200).json({
          tasks:tasks
      })
  } catch (error) {
    console.log(error)
  }
}

const deleteTasks = async (req,res) => {
    // try {
    //     const {id} = req.params
    //     const task = await Task.findByIdAndDelete(id)
    //     if(!task){
    //         return res.status(404).json({message: 'Task not found'})
    //     }
    //     return res.status(200).json({message: 'Task deleted successfully'})
    // } catch (error) {
    //     return res.status(400).json({message: 'Task deletion failed'})
    // }

    const {id} = req.params
    console.log(id)
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateTask = async (req,res) => {
    const {id} = req.params
    const {description,isCompleted} = req.body
    try {
        const updatedTask = await Task.findByIdAndUpdate(id,{
            desc: description,
            isCompleted: isCompleted
        },{
            new: true
        })
        console.log(updatedTask)
        if(!updatedTask){
            return res.status(404).json({message: 'Task not found'})
        }
        return res.status(200).json({message: 'Task updated successfully'})

    }catch(error){
        return res.status(400).json({message: 'Task update failed'})
    }

}

module.exports = {test1, addTask, getAllTasks, deleteTasks, updateTask}