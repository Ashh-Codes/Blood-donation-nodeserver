const users =require('../models/userModel')
const hospitals = require('../models/hospitalModel')
const jwt= require('jsonwebtoken')

exports.registerUserController=async(req,res)=>{
    console.log("Inside user register controller");
    console.log(req.body);
    
    const {username,email,password} =req.body
    console.log(username,email,password);
    
    try {
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        
        if(existingUser){
            res.status(406).json("Account already exists ...please login")
        }
        else{
            const newUser= new users({
                username,email,password,profilePic:""
            })
            
            
            await newUser.save()
            
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
   // res.status(200).json("Register request recieved")

    
    
}
exports.registerHospitalController =async(req,res)=>{
    console.log("Inside hospital register controller");
    console.log(req.body);
    const {email,password,hospitalname,registerNumber,contact} =req.body
    try {
        const existingUser = await hospitals.findOne({email})
        console.log(existingUser);
        
        if(existingUser){
            res.status(406).json("Account already exists ...please login")
        }
        else{
            const newHospital= new hospitals({
                email,password,hospitalname,registerNumber,contact,hospitalPic:""
            })
            await newHospital.save()
            res.status(200).json(newHospital)
        }
    } catch (err) {
        res.status(401).json(err)
    }
    
}

exports.loginUserController =async(req,res)=>{
    console.log("Inside login controller");
    const {email,password}=req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){

            const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }
        else{
            res.status(404).json("Invalid Email/password")
        }
    } catch (err) {
        res.status(401).json(err)
    }
    
    
}

exports.loginHospitalController =async(req,res)=>{
    console.log("Inside hospital login controller");
    const {email,password}=req.body
    console.log(email,password);
    try {
        const existingUser = await hospitals.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                hospital:existingUser,
                token
            })
        }
        else{
            res.status(404).json("Invalid Email/password")
        }
    } catch (err) {
        res.status(401).json(err)
    }
    
    
}
exports.getAllHospitals=async(req,res)=>{
    console.log("Inside allHospitals");
    try {
        const allHospitals= await hospitals.find()
        res.status(200).json(allHospitals)
    } catch (err) {
        res.status(401).json(err)
    }
    
}


exports.editHospitalProfile=async(req,res)=>{
    console.log("Inside editHospitalProfile");
    const {email,password,hospitalname,registerNumber,contact,hospitalPic}=req.body
    const uploadImg=req.file?req.file.filename:hospitalPic
    const userId=req.userId
    try {
        const updatedUser=await hospitals.findByIdAndUpdate({_id:userId},{
            email,password,hospitalname,registerNumber,contact,hospitalPic:uploadImg
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

exports.editUserProfile=async(req,res)=>{
    console.log("Inside editUserProfile");
    const {username,email,password,profilePic}=req.body
    console.log(username,email,password,profilePic);
    const uploadImg=req.file?req.file.filename:profilePic
    console.log(uploadImg);
    const userId=req.userId
    try {
        const updatedUser=await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profilePic:uploadImg
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(401).json(err)
    }
    
}
