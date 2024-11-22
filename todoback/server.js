const express  = require('express');
const app = express();
const authRouter = require('./routes/auth.route.js')
const connetDb = require('./utils/db.js')
const dotenv = require('dotenv')

dotenv.config()

connetDb()
app.use(express.json());
app.use("/api",authRouter);


app.listen(process.env.PORT || 6000,()=>{
    console.log('server is running on port 6000')
})