const jwt=require('jsonwebtoken')

const jwtmiddleware=(req,res,next)=>{
    console.log("Inside middleware");
    const token=req.headers["authorization"].split(" ")[1]
    console.log(token);
   if(token){
    try {
        const jwtresponse=jwt.verify(token,process.env.JWT_PASSWORD)
        console.log(jwtresponse);
        req.userId=jwtresponse.userId
        next()
    } catch (err) {
        res.status(401).json("Please login to proceed...authentication failed")
    }
   }else{
    res.status(406).json("Token missing")
   }
    
}
module.exports =jwtmiddleware