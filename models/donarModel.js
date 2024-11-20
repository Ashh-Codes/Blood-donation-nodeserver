const mongoose =require('mongoose')

const donarSchema =new mongoose.Schema({
    donarName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const donars =mongoose.model("donars",donarSchema)
module.exports =donars

