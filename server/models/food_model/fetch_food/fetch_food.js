const express = require("express")
const DatabaseObj = require("../../../config/database")


//router OBJECT
const router = express.Router();

router.post("/fetchFood" , (req , res)=>{
    try{
        //get request from user
        const {email, phone} = req.body; 

        //mysql connection
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        if(phone == "fromMail"){
            var sql_getTableName =`SELECT user_name FROM USER_INFO WHERE email="${email}"`;
            connectDB.volQueryObject(sql_getTableName ,(error, result, retData) => {
                if (error) {
                    //console.error(error);
                    res.status(201).send({
                        success: false, 
                        message: "food fetching failed!!!"
                    })
                }else{
                    if(result==true){
                        const uName = retData[0].user_name;
                        var sql_command2 = `SELECT * FROM ${uName}`; 
                        connectDB.volQueryObject(sql_command2 ,(error2, result2, retData2) => {
                            if(error2){
                                res.status(201).send({
                                    success: false, 
                                    message: "all food fetching failed!!!"
                                })
                            }else{
                                res.status(201).send({
                                    success: true,
                                    message: retData2
                                });
                            }
                        })
                    }
                }
            })
        }else{
            var sql_getTableName =`SELECT user_name FROM USER_INFO WHERE phone_number="${phone}"`;
            connectDB.volQueryObject(sql_getTableName ,(error, result, retData) => {
                if (error) {
                    //console.error(error);
                    res.status(201).send({
                        success: false, 
                        message: "food fetching failed!!!"
                    })
                }else{
                    if(result==true){
                        const uName = retData[0].user_name;
                        var sql_command2 = `SELECT * FROM ${uName}`; 
                        connectDB.volQueryObject(sql_command2 ,(error2, result2, retData2) => {
                            if(error2){
                                res.status(201).send({
                                    success: false, 
                                    message: "all food fetching failed!!!"
                                })
                            }else{
                                res.status(201).send({
                                    success: true,
                                    message: retData2
                                });
                            }
                        })
                    }
                }
            })
        }
    }catch(error){
        //console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in fetch food api",
        });
    }
})

module.exports = router
