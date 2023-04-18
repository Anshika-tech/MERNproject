const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');


require('../db/conn');
const User=require('../model/userSchema');


router.get('/',(req,res)=>{
    res.send(`hello world from the server router js`);
})

//using promises
// router.post('/register',(req,res)=>{

//     const {firstname,lastname,email,gender,phone,age,password,cpassword}=req.body
     
//     if(!firstname||!lastname||!email||!gender||!phone||!age||!password||!cpassword){
//         return res.status(422).json({error:"Plz filed details"})
//     }
     
//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"});
//         }

//         const user=new User({firstname,lastname,email,gender,phone,age,password,cpassword})

//         user.save().then(()=>{
//             res.status(201).json({maessage:"user registered successfully"});
//         }).catch((err)=>{
//             res.status(500).json({error:"Failed to register"});
//         })
//     }).catch(err=>{
//         console.log(err);
//     })
// });

//using async
router.post('/register',async(req,res)=>{

    const {firstname,lastname,email,gender,phone,age,password,cpassword}=req.body
     
    if(!firstname||!lastname||!email||!gender||!phone||!age||!password||!cpassword){
        return res.status(422).json({error:"Plz filed details"})
    }
     
    try{
        const userExist=await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"Email already exist"});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"password are not matching"});
        }else{
        const user=new User({firstname,lastname,email,gender,phone,age,password,cpassword});

         await user.save();
        res.status(201).json({message:"user registered successfully"});

        // if(userRegister){
        //     res.status(201).json({message:"user registered successfully"});
        // }
        // else{
        //     res.status(500).json({error:"Failed to register"});
        // }
        }
    }catch(err){
    console.log(err);
    }
});

//login route
router.post('/signin',async(req,res)=>{
    //  console.log(req.body);
    //  res.json({message:"awesome"})
    try{

        let token;
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({error:"plz filled the data"})
        }
        const userLogin= await User.findOne({email:email});
       // console.log(userLogin);
       if(userLogin){
        const isMatch=await bcrypt.compare(password,userLogin.password);

        token= await userLogin.generateAuthToken();
       console.log(token);

       res.cookie("jwtoken",token,{
         expires:new Date(Date.now()+25892000000),
         httpOnly:true,

       });

        if(!isMatch){
            res.status(400).json({error:"Invalid credentials paas"});
        }
        else{
            res.json({message:"user sign in successfully"});
        }
       }else{
        return res.status(400).json({error:"Invalid credentials 1"});
            }
     

    }catch(err){
     console.log(err);
    }
})
module.exports=router;