const mongoose =require("mongoose")

const campSchema =new  mongoose.Schema({
    hospitalName:{
        type:String,
        required:true,
          
    },
    email:{
        type:String,
        required:true,
        
    },

    venue:{

        type:String,
        required:true,
        
    },
    date:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    venuePic:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
const camps=mongoose.model("camps",campSchema)
module.exports =camps