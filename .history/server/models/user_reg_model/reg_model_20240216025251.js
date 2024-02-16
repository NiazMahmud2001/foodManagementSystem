
const express = require("express")
const DatabaseObj = require("../../config/database")

//router OBJECT
const router = express.Router()

router.post("/register" , async(req , res)=>{
    // req : we will get the requested data from user 
    // res : the responser that we want to send to the user from server 

    try{
        //get request from user
        const {first_name, last_name, user_name, user_password, email, phone_number, address} = req.body; 

        //mysql connection
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        if(!first_name){
            return res.status(400).send({
                success: false , 
                message: "Please Enter first name"
            })
        };
        if(!last_name){
            return res.status(400).send({
                success: false , 
                message: "Please Enter last name"
            })
        };
        if(!user_name){
            return res.status(400).send({
                success: false , 
                message: "Please Enter user name"
            })
        };
        if(!user_password || user_password.length<6||user_password.length>10){
            if(!user_password){
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password"
                })
            }else if(user_password.length<6){
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password length more than 6"
                })
            }else if(user_password.length>10){
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password length less than 11"
                })
            }else{
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password !!!"
                })
            }
        };
        if(!email){
            return res.status(400).send({
                success: false , 
                message: "Please Enter email"
            })
        };
        if(!phone_number){
            return res.status(400).send({
                success: false , 
                message: "Please Enter phone_number"
            })
        };
        if(!address){
            return res.status(400).send({
                success: false , 
                message: "Please Enter your address"
            })
        };
        
        connectDB.removeConnection()


    }catch(error){
        console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in register api",
            error,
        })
    }
})

module.exports = router





































