
const express = require("express")
const DatabaseObj = require("../../config/database")

//router OBJECT
const router = express.Router()

//mysql connection
connectDB = new DatabaseObj()
connectDB.createConnection()

router.post("/register" , async(req , res)=>{
    // req : we will get the requested data from user 
    // res : the responser that we want to send to the user from server 

    try{

    }catch(error){
        console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in register api",
            error,
        })
    }
})

connectDB.removeConnection()





































