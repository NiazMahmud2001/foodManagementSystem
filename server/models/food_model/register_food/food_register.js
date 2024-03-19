const express = require("express")
const DatabaseObj = require("../../../config/database")

//router OBJECT
const router = express.Router()

router.post("/registerFood" , (req , res)=>{
    function generateFoodUid(length) {
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8','9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x', 'y', 'z', "!", "@", "#", "$", "%", "&"]
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            result += arr[randomIndex];
        }
        return result;
    }

    try{
        const {email, phone, foodName, quantity, weight, expDate} = req.body;
        console.log(email, phone, foodName, quantity, weight, expDate)

        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        if(!email){
            return res.status(400).send({
                success: false , 
                message: "Please Enter email"
            });
        };
        if(!phone){
            return res.status(400).send({
                success: false , 
                message: "Please Enter phone"
            });
        };
        if(!foodName){
            return res.status(400).send({
                success: false , 
                message: "Please Enter foodName"
            });
        };
        if(!quantity){
            return res.status(400).send({
                success: false , 
                message: "Please Enter quantity"
            });
        };
        if(!weight){
            return res.status(400).send({
                success: false , 
                message: "Please Enter weight"
            });
        };
        if(!expDate){
            return res.status(400).send({
                success: false , 
                message: "Please Enter expDate"
            });
        };

        //save user in Database
        if(phone == "fromMail"){
            console.log("no phone!!!")
            console.log("email: ", email)

            // communicate with database 
            var sql_getTableName =`SELECT user_name FROM USER_INFO WHERE email="${email}"`;
            connectDB.volQueryObject(sql_getTableName ,(error, result, retData) => {
                if (error) {
                    console.error(error);
                    res.status(201).send({
                        success: false, 
                        message: "food registration failed!!!"
                    })
                } else {
                    //console.log(result);
                    //console.log(retData);
                    if(result == true){
                        const uName = retData[0].user_name;
                        //console.log(uName)
                        var sql_command2 = `SELECT MAX(identifier_key) AS MAXKey FROM ${uName}`; 
                        connectDB.volQueryObject(sql_command2 ,(error2, result2, retData2) => {
                            if(error2){
                                res.status(201).send({
                                    success: false, 
                                    message: "max key fetching failed!!!"
                                })
                            }else{
                                if (result2 == true){
                                    const maxKey =retData2[0].MAXKey;
                                    //console.log("Mango: ", retData2[0].MAXKey)
                                    const letKey = maxKey+1;
                                    const newId = generateFoodUid(5)+uName[0]+letKey+generateFoodUid(5)+uName[uName.length-1];

                                    const sql_command3 = `INSERT INTO ${uName} VALUES(${letKey}, "${foodName}", "${newId}", ${quantity}, ${weight} , "${expDate}")` ; 
                                    connectDB.queryObject(sql_command3 ,(error4, result4) => {
                                        if(error){
                                            res.status(201).send({
                                                success: false, 
                                                message: "failed to adding info in user page!!!"
                                            })
                                        }else{
                                            res.status(201).send({
                                                success: true,
                                                message: "added food item in user database!!!"
                                            });
                                        }
                                    })
                                    //connectDB.removeConnection()
                                }else{
                                    res.status(201).send({
                                        success: false, 
                                        message: "max key fetching failed!!!"
                                    })
                                }
                            }
                        })
                    }else{
                        res.status(201).send({
                            success: false, 
                            message: "user not found in database!!!"
                        })
                    }
                }
            });
        }else if (email == "fromPhone"){
            console.log("no mail!!!")
            console.log("phone: ", phone)

            // communicate with database 
            var sql_getTableName =`SELECT user_name FROM USER_INFO WHERE phone_number="${phone}"`;
            connectDB.volQueryObject(sql_getTableName ,(error, result, retData) => {
                if (error) {
                    console.error(error);
                    res.status(201).send({
                        success: false, 
                        message: "food registration failed!!!"
                    })
                } else {
                    //console.log(result);
                    //console.log(retData);
                    if(result == true){
                        const uName = retData[0].user_name;
                        //console.log(uName)
                        var sql_command2 = `SELECT MAX(identifier_key) AS MAXKey FROM ${uName}`; 
                        connectDB.volQueryObject(sql_command2 ,(error2, result2, retData2) => {
                            if(error2){
                                res.status(201).send({
                                    success: false, 
                                    message: "max key fetching failed!!!"
                                })
                            }else{
                                if (result2 == true){
                                    const maxKey =retData2[0].MAXKey;
                                    //console.log("Mango: ", retData2[0].MAXKey)
                                    const letKey = maxKey+1;
                                    const newId = generateFoodUid(5)+uName[0]+letKey+generateFoodUid(5)+uName[uName.length-1];
                                    const sql_command3 = `INSERT INTO ${uName} VALUES(${letKey}, "${foodName}", "${newId}", ${quantity}, ${weight} , "${expDate}")` ; 
                                    connectDB.queryObject(sql_command3 ,(error4, result4) => {
                                        if(error){
                                            res.status(201).send({
                                                success: false, 
                                                message: "failed to adding info in user page!!!"
                                            })
                                        }else{
                                            res.status(201).send({
                                                success: true,
                                                message: "added food item in user database!!!"
                                            });
                                        }
                                    })
                                    //connectDB.removeConnection()
                                }else{
                                    res.status(201).send({
                                        success: false, 
                                        message: "max key fetching failed!!!"
                                    })
                                }
                            }
                        })
                    }else{
                        res.status(201).send({
                            success: false, 
                            message: "user not found in database!!!"
                        })
                    }
                }
            });
        };
    }catch(error){
        console.log(`error cause in "FoodRegister" api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in FoodRegister api!!!",
        });
    }
})
module.exports = router