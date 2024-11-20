const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    hospitalname:{
        type:String,
        required:true
    },
    registerNumber:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
    }
    ,
    hospitalPic:{
        type:String
    }
})

const hospitals = mongoose.model("hospitals",hospitalSchema)
module.exports =hospitals