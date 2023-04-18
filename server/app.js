const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express=require('express');
const app=express();

dotenv.config({path:'./config.env'})
require('./db/conn');
//const User=require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'))
const PORT=process.env.PORT;


//Middleware
const middleware=(req,res,next)=>{
       console.log("Helloo my middleware");
       next();
}


app.get('/',(req,res)=>{
     res.send(`hello world from the server app.js`);
})

app.get('/about',middleware,(req,res)=>{
     
     res.send(`hello about world from the server`);
})

app.get('/contact',(req,res)=>{
     //res.cookie("test",'thapa')
     res.send(`hello contact world from the server`);
})

app.get('/signin',(req,res)=>{
     res.send(`hello login world from the server`);
})

app.get('/signup',(req,res)=>{
     res.send(`hello Registration world from the server`);
})

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})