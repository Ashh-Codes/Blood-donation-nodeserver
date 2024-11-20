const donars = require('../models/donarModel')
const jwt = require('jsonwebtoken')

exports.addDonarController=async(req,res)=>{
    console.log("Inside addDonarController");
    const {donarName,email,bloodGroup,district}=req.body
    console.log(req.userId);
    
   // console.log(donarName,email,bloodGroup,district);
    
    try {
        const existingDonar=await donars.findOne({email})
        console.log(existingDonar);
        
        
        if(existingDonar){
            res.status(406).json("Donar already exists...if you want to add new availability,please delete previous one")
        }else{
            const newDonar=new donars({
                donarName,email,bloodGroup,district,userId:req.userId
                
                
                // donarName,email,bloodGroup,district,userId
            })
            console.log(newDonar);
            
            await newDonar.save()
            res.status(200).json(newDonar)

        }

    } catch (err) {
        res.status(401).json(err)
    }

    
}

exports.getAllDonarController=async(req,res)=>{
    console.log("Inside alldonarcontroller");
    const searchKey=req.query.search
    const query ={
        district:{
            $regex:searchKey,$options:"i"

        }
    }
    try{
        const allDonar= await donars.find(query)
        res.status(200).json(allDonar)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.deleteDonarController=async(req,res)=>{
    console.log("Inside deleteDonarController");
    const {pid} =req.params
    try {
        const removeDonar=await donars.findByIdAndDelete({_id:pid})
        res.status(200).json(removeDonar)
    } catch (err) {
        res.status(401).json(err)
        
    }
    
}