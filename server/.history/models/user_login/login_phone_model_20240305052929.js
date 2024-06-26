const express = require("express")
const DatabaseObj = require("../../config/database")


//router OBJECT
const router = express.Router()

router.post("/loginPhone" , (req , res)=>{
    try{
        //get request from user
        const {phone_number, user_password} = req.body; 

        //mysql connection
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        //validating the syntax of mail and password 
        if(!user_password || user_password.length<6||user_password.length>10){
            if(!user_password){
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password"
                });
            }else if(user_password.length<6){
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password length more than 6"
                });
            }else if(user_password.length>10){
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password length less than 11"
                });
            }else{
                return res.status(400).send({
                    success: false , 
                    message: "Please Enter user password !!!"
                });
            };
        };

        if(phone_number.length != 13){
            return res.status(400).send({
                success: false , 
                message: "Please Enter phone_number length 13"
            });
        }else if (!phone_number){
            return res.status(400).send({
                success: false , 
                message: "Please Enter phone_number"
            });
        };

        // communicate with database 
        var sql_loginEmail_commands = `SELECT user_password, email FROM USER_INFO WHERE user_password='${user_password}' AND phone_number='${phone_number}'` ; 
        
        connectDB.queryLoginObject(sql_loginEmail_commands ,(error, result) => {
            if (error) {
                console.error(error);
                res.status(201).send({
                    success: false, 
                    message: "login failed, you may not registered yet!!!"
                })
            } else {
                console.log(result);
                if(result == true){
                    res.status(201).send({
                        success: true, 
                        message: "login successful"
                    });
                }else{
                    res.status(201).send({
                        success: false, 
                        message: "login failed, you may not registered yet!!!"
                    })
                }
            }
        });
        connectDB.removeConnection()

    }catch(error){
        console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in register api",
            error,
        });
    }
})
module.exports = router




































