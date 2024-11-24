const express = require('express')
const taskRouter = express.Router()
const verify = require('../middlewares/auth.middleware.js')
const {test1, addTask, getAllTasks, deleteTasks, updateTask} = require('../controllers/task.controller.js')

taskRouter.get('/hi', test1)
taskRouter.post('/add-task', verify,addTask)
taskRouter.get('/all-tasks',verify,getAllTasks)
taskRouter.post('/delete-task/:id',verify,deleteTasks)
taskRouter.post('/update-task/:id',verify,updateTask)
module.exports  = taskRouter
