const mongoose = require('mongoose')

const dbconnection = process.env.CONNECTION_STRING


mongoose.connect(dbconnection).then(res=>{
    console.log("DB Connection atlas started");
    
}).catch(err=>{
    console.log('Connection failed');
    console.log(err);
    
    
})