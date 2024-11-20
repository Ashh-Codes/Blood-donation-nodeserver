require('dotenv').config()
const express = require('express')
const cors =require('cors')
const router =require('./routes/router')
require('./dbConnectios/connection')

const bdServer = express()

bdServer.use(cors())
bdServer.use(express.json())
bdServer.use(router)
bdServer.use('/uploads',express.static('./uploads'))

const PORT =3000 || process.env.PORT

bdServer.listen(PORT,()=>{
    console.log(`Bdserver started at ${PORT} and waiting for client request`);
    
})

bdServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">Bdserver started waiting for client request</h1>`)
})
