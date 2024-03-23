const express = require("express")
const DatabaseObj = require("../../config/database")


//router OBJECT
const router = express.Router()

router.post("/loginMail" , (req , res)=>{
    try{
        //get request from user
        const {email, user_password} = req.body; 

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

        if(email.length>50){
            return res.status(400).send({
                success: false , 
                message: "Please Enter email length less than 50"
            });
        }else if(!email){
            return res.status(400).send({
                success: false , 
                message: "Please Enter email"
            });
        };

        // communicate with database 
        const sql_loginEmail_commands = `SELECT points, user_name FROM USER_INFO WHERE user_password='${user_password}' AND email='${email}'` ; 
        connectDB.volQueryObject(sql_loginEmail_commands ,(error, result, data) => {
            if (error) {
                console.error(error);
                res.status(401).send({
                    success: false, 
                    message: "login failed, you may not registered yet!!!"
                })
            } else {
                //console.log(result, data[0].points, data[0].user);
                if(result == true){
                    res.status(201).send({
                        success: true, 
                        message: data[0]
                    });
                }else{
                    res.status(401).send({
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




































