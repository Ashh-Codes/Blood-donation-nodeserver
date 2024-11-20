const mongoose =require("mongoose")

const bookingSchema =new  mongoose.Schema({
    hospitalName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
const bookings=mongoose.model("bookings",bookingSchema)
module.exports =bookings