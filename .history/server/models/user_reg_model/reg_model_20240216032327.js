
const express = require("express")
const DatabaseObj = require("../../config/database")

//router OBJECT
const router = express.Router()

router.post("/register" , async(req , res)=>{
    // req : we will get the requested data from user 
    // res : the responser that we want to send to the user from server 

    try{
        console.log("1")
        //get request from user
        const {first_name, last_name, user_name, user_password, email, phone_number, address} = req.body; 

        console.log("2")
        //mysql connection
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        console.log("3")
        if(first_name.length>20){
            return res.status(400).send({
                success: false , 
                message: "Please Enter first name less than 20"
            })
        }else if(!first_name){
            return res.status(400).send({
                success: false , 
                message: "Please Enter first name"
            })
        };

        if (last_name.length>20){
            return res.status(400).send({
                success: false , 
                message: "Please Enter last name length less than 20"
            })
        }else if(!last_name){
            return res.status(400).send({
                success: false , 
                message: "Please Enter last name"
            })
        };

        if (user_name.length>20){
            return res.status(400).send({
                success: false , 
                message: "Please Enter user name length less than 20"
            })
        }else if(!user_name){
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

        if(email.length>50){
            return res.status(400).send({
                success: false , 
                message: "Please Enter email length less than 50"
            })
        }else if(!email){
            return res.status(400).send({
                success: false , 
                message: "Please Enter email"
            })
        };
       
        if(phone_number.length != 13){
            return res.status(400).send({
                success: false , 
                message: "Please Enter phone_number length 13"
            })
        }else if (!phone_number){
            return res.status(400).send({
                success: false , 
                message: "Please Enter phone_number"
            })
        };
        
        if(address.length>50){
            return res.status(400).send({
                success: false , 
                message: "Please Enter your address length less than 50"
            })
        }else if(!address){
            return res.status(400).send({
                success: false , 
                message: "Please Enter your address"
            })
        };

        //save user in Database
        var sql_reg_commands = `INSERT INTO USER_INFO VALUES(${first_name}, ${last_name}, ${user_name}, ${user_password}, ${email}, ${phone_number}, ${address});` ; 
        connection.query(sql_reg_commands, function (error, results, fields) {
            if (error){
                console.log("user registration is failed!!!");
            }else{
                console.log("registration completed...");
                console.log(results);
            }
          });
        res.status(201).send({
            success: true, 
            message: "Registration successful please login"
        })
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





































