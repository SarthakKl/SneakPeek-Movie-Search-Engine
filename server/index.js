const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors')
const db = require('./dbConnection');
const authRouter = require('./src/routes/authRoutes')
const userRouter = require('./src/routes/userRoutes')

app.use(cors())
app.use(express.json())
db.connect();

app.get('/',(req,res)=>{
    res.json({
        message:"working fine",
        status_code:200
    })
})
app.use('/api/', authRouter);
app.use('/api/user/', userRouter)

const port = process.env.PORT || 5000;
app.listen(port,(req,res)=>{
    console.log("server is running at 5000");
})

module.exports = app;
