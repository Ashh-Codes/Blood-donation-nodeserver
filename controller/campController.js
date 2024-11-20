const camps  =require('../models/campModel')
const bookings=require('../models/bookingModel')


exports.addCampController=async(req,res)=>{
    console.log("Insdie addcampController");
    const {hospitalName,venue,contact,date,email} = req.body
    console.log(req.file.filename);
    //res.status(200).json("Add camp ")

    try {

     
        const newCamp=new camps({
            hospitalName,email,venue,date,contact,venuePic:req.file.filename,userId:req.userId
        })
        
        
        await newCamp.save()

        res.status(200).json(newCamp)
    } catch (err) {
        res.status(401).json(err)
        
    }

    
    

    
}
exports.getHomeCampController =async(req,res)=>{
    console.log("Inside homecampcontroller");
    try{
        const homeCamps=await camps.find().limit(3)
        res.status(200).json(homeCamps)
    }catch(err)
    {
        res.status(401).json(err)
    }

    
}
//all camps authentication required
exports.getAllCampController=async(req,res)=>{
    console.log("Inside allcampscontroller");
    try{
        const allCamps= await camps.find()
        res.status(200).json(allCamps)
    }
    catch(err){
        res.status(401).json(err)
    }
    
}
exports.deleteCampController=async(req,res)=>{
    console.log("Inside deleteCampController");
    const {cid} =req.params
    try {
        const removeCamp=await camps.findByIdAndDelete({_id:cid})
        res.status(200).json(removeCamp)
    } catch (err) {
        res.status(401).json(err)
        
    }
    
}
exports.editCampController=async(req,res)=>{
    console.log("Inside editCampController");
    const {cid} =req.params
    const {hospitalName,venue,contact,date,email,venuePic} = req.body
    const uploadImg=req.file?req.file.filename:venuePic
    const userId=req.userId
    try {
        const updateCamp=await camps.findByIdAndUpdate({_id:cid},{
            hospitalName,email,venue,date,contact,venuePic:uploadImg,userId
        },{new:true})
        await updateCamp.save()
        res.status(200).json(updateCamp)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getAllCampHospitalController=async(req,res)=>{
    console.log("Inside getAllCampHospitalController");
    //const useremail=req.query.userEmail
    const { hospitalEmail: useremail } = req.query;
    // console.log(req.body);
    
    // const {email} =req.body
     console.log(`hospital email is ${useremail}`);
    
    try {
        const allCampsHospital= await camps.find({email:useremail})
        console.log(allCampsHospital);
        
        res.status(200).json(allCampsHospital)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

exports.addBookingController=async(req,res)=>{
    console.log("Inside add booking contrller");
    const {hospitalName,email,contact,venue,date,useremail}=req.body
    try {
        
        const newBooking=new bookings({
            hospitalName,email,contact,venue,date,useremail,userId:req.userId
        })
        
        
        await newBooking.save()

        res.status(200).json(newBooking)
    } catch (err) {
        res.status(401).json(err)
        
    }

    
}

exports.getAllCampBookingsController=async(req,res)=>{
    console.log("Inside getAllCampBookingsController");
   //const userEmail=req.query.userEmail
   const { userEmail: userEmail } = req.query;
    
    console.log(`user email is ${userEmail}`);
    
    try {
        const allCampsBookings= await bookings.find({useremail:userEmail})
        console.log(allCampsBookings);
        
        res.status(200).json(allCampsBookings)
    } catch (err) {
        res.status(401).json(err)
    }
    
}


