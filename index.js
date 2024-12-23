import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import contextRouter from './routers/contextRouter.js';
import chatRouter from './routers/chatRouter.js';
import proxy from 'express-http-proxy';

const app=express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/proxy', proxy('http://localhost:5000'));

mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{console.log("Database connected")})
        .catch((error)=>{console.log(error.message)})

app.get('/',(req,res)=>{
    res.json({message:"Welcome to chat with multiple pdfs backend"});
})

const routers=[
    contextRouter,
    chatRouter
]

routers.map((router)=>{
    app.use(router)
})

app.listen(5001,()=>{
    console.log("App listens on Port 5001")
})