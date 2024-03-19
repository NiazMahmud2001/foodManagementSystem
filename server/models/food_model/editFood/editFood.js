const express = require("express")
const DatabaseObj = require("../../../config/database")

//router OBJECT
const router = express.Router()

router.post("/edit_Food" , (req , res)=>{
    try{
        //get request from user
        const {foodName, foodId , quantity, weight , expDate, email, phone, beforeFoodName, beforeFoodId, beforeQuantity, beforeWeight, beforeExpDate} = req.body; 
        
        if(!foodName || !foodId || !quantity || !weight || !expDate){
            return res.status(400).send({
                success: false , 
                message: "Invalid Data"
            });
        };

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
                        message: "Getting user)name from email failed!!!"
                    })
                }else{
                    if(result==true){
                        const uName = retData[0].user_name;
                        const sql_command2 = `SELECT identifier_key from ${uName} WHERE food_name="${beforeFoodName}" AND food_id="${beforeFoodId}" AND quantity=${beforeQuantity} AND weight=${beforeWeight} AND expDate="${beforeExpDate}"`; 
                        //console.log("call1: ", uName);
                        connectDB.volQueryObject(sql_command2 ,(error2, result2, retData2) => {
                            if(error2){
                                //console.log(error2)
                                res.status(201).send({
                                    success: false, 
                                    message: "Getting user table from usr_name failed!!!!!!"
                                })
                            }else{
                                if(result2 == true){
                                    const identifierKey = retData2[0].identifier_key
                                    //console.log(identifierKey);
                                    const sql_command3 = `UPDATE ${uName} SET food_name="${foodName}" , food_id="${foodId}", quantity=${quantity}, weight=${weight}, expDate="${expDate}" WHERE identifier_key=${identifierKey}`; 
                                    //console.log("data's11: ", uName, foodName, foodId, quantity, weight, expDate, identifierKey)
                                    connectDB.queryObject(sql_command3 ,(error3, result3) => {
                                        if (error){
                                            //console.log(error3)
                                            res.status(201).send({
                                                success: false, 
                                                message: "updating food failed!!!!!!"
                                            })
                                        }else{
                                            res.status(201).send({
                                                success: true, 
                                                message: "updating food success!!!!!!"
                                            })
                                        }
                                    })
                                }else{
                                    //console.log("data's: ", uName, foodName, foodId, quantity, weight, expDate)
                                    res.status(201).send({
                                        success: false, 
                                        message: "fetching identifier key failed!!!!!!"
                                    })
                                }
                            }
                        })
                    }else{
                        res.status(201).send({
                            success: false, 
                            message: "fetching table name failed!!!"
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
                        message: "Getting user)name from email failed!!!"
                    })
                }else{
                    if(result==true){
                        const uName = retData[0].user_name;
                        const sql_command2 = `SELECT identifier_key from ${uName} WHERE food_name="${beforeFoodName}" AND food_id="${beforeFoodId}" AND quantity=${beforeQuantity} AND weight=${beforeWeight} AND expDate="${beforeExpDate}"`; 
                        //console.log("call1: ", uName);
                        connectDB.volQueryObject(sql_command2 ,(error2, result2, retData2) => {
                            if(error2){
                                //console.log(error2)
                                res.status(201).send({
                                    success: false, 
                                    message: "Getting user table from usr_name failed!!!!!!"
                                })
                            }else{
                                if(result2 == true){
                                    const identifierKey = retData2[0].identifier_key
                                    //console.log(identifierKey);
                                    const sql_command3 = `UPDATE ${uName} SET food_name="${foodName}" , food_id="${foodId}", quantity=${quantity}, weight=${weight}, expDate="${expDate}" WHERE identifier_key=${identifierKey}`; 
                                    //console.log("data's11: ", uName, foodName, foodId, quantity, weight, expDate, identifierKey)
                                    connectDB.queryObject(sql_command3 ,(error3, result3) => {
                                        if (error){
                                            //console.log(error3)
                                            res.status(201).send({
                                                success: false, 
                                                message: "updating food failed!!!!!!"
                                            })
                                        }else{
                                            res.status(201).send({
                                                success: true, 
                                                message: "updating food success!!!!!!"
                                            })
                                        }
                                    })
                                }else{
                                    //console.log("data's: ", uName, foodName, foodId, quantity, weight, expDate)
                                    res.status(201).send({
                                        success: false, 
                                        message: "fetching identifier key failed!!!!!!"
                                    })
                                }
                            }
                        })
                    }else{
                        res.status(201).send({
                            success: false, 
                            message: "fetching table name failed!!!"
                        })
                    }
                }
            })
        }
    }catch(error){
        //console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in update food api!!!",
        });
    }
})

module.exports = router;