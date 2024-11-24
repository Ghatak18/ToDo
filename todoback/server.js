const express  = require('express');
const app = express();
const authRouter = require('./routes/auth.route.js')
const taskRouter = require('./routes/task.route.js')
const connetDb = require('./utils/db.js')
const dotenv = require('dotenv')
const cp = require('cookie-parser')

dotenv.config()


connetDb()
app.use(express.json());
app.use(cp())
app.use("/user",authRouter);
app.use('/task',taskRouter)

app.listen(process.env.PORT || 6000,()=>{
    console.log('server is running on port 6000')
})