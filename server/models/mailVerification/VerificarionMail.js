const express = require("express")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const DatabaseObj = require("../../config/database")

dotenv.config()

//router OBJECT
const router = express.Router()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MYMAIL,
        pass: process.env.MAILPASS
    },
});

function randNumber (){
    var a = ""
    for (let x = 0 ; x<6 ; x++){
        a+=Math.floor(Math.random() * 10).toString();
    }
    return a;
}

router.post("/verifyMailDegit" , (req , res)=>{
    try{
        const {email, phone_number} = req.body; 
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

        const randNUm = randNumber();
        console.log("token show: ", randNUm)
        console.log("email show: ", email)

        const mailOptions = {
            from:  {
                name : "App Server",
                address: process.env.MYMAIL
            },
            to: [email],
            subject: 'Confirm your email address for FoodFlow App',
            text: `The mail verification code is: ${randNUm}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).send({
                    success: false , 
                    message: "Mail address is not valid"
                });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send({
                    success: true , 
                    message: randNUm
                });
            }
        });
    }catch(error){
        console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in verification mail api",
        });
    }
})

module.exports = router