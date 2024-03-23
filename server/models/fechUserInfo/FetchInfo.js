const express = require("express")
const DatabaseObj = require("../../config/database")


//router OBJECT
const router = express.Router()

router.post("/fetchUseData" , (req , res)=>{
    try{
        const {userNName} = req.body; 
        if(!userNName){
            return res.status(400).send({
                success: false , 
                message: "Invalid user name"
            });
        };

        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        const sql_loginEmail_commands = `SELECT * FROM USER_INFO WHERE user_name='${userNName}'` ; 
        connectDB.volQueryObject(sql_loginEmail_commands ,(error, result, data) => {
            if (error) {
                console.error(error);
                res.status(401).send({
                    success: false, 
                    message: "fetching user info failed!!!"
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
                        message: "fetching user info failed!!!"
                    })
                }
            }
        })
    }catch(error){
        console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in fetch user info api",
            error,
        });
    }
})
module.exports = router