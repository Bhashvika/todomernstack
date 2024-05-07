const express=require("express");
const app=express();
const taskroute=require('./routes/taskroute');
const cors=require("cors");
require('dotenv').config();
require('./connection/conn')
app.use(cors())
app.use(express.json());
app.use('/api/v1',taskroute);
const PORT=process.env.port||5000;
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})