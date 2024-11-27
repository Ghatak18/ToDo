const express  = require('express');
const app = express();
const authRouter = require('./routes/auth.route.js')
const taskRouter = require('./routes/task.route.js')
const connetDb = require('./utils/db.js')
const dotenv = require('dotenv')
const cp = require('cookie-parser')
const cors = require('cors')

dotenv.config()


connetDb()
app.use(express.json());
app.use(cp())
app.use("/user",authRouter);
app.use('/task',taskRouter)

const corsOptions = {
    origin: '*', // Allow all origins (for development)
    methods: 'GET,POST,PUT,DELETE', // Allow specific methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
    preflightContinue: false, // Set to false to send the response back to the client directly
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  app.use(cors(corsOptions));



app.get("/cors", (req,res) =>{
const jokes =[{
    "id": 1,
    "joke": "Why couldn't the bicycle stand up by itself?",
    "punchline": "Because it was two-tired."
},
{
    "id": 2,
    "joke": "What do you call a fake noodle?",
    "punchline": "An impasta."
},
{
    "id": 3,
    "joke": "Why did the scarecrow win an award?",
    "punchline": " hello suor"
},
{
   "id": 4,
    "joke": "Why did the scarecrow win an award?",
    "punchline": " hello suor" 
}] 

return res.json(jokes)
})

app.listen(process.env.PORT || 8080,()=>{
    console.log('server is running on port 8080')
})