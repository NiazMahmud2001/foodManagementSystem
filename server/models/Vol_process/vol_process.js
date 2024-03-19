const express = require("express")
const DatabaseObj = require("../../config/database")

//router OBJECT
const router = express.Router()

router.post("/volAddPoints" , (req , res)=>{
    try{
        //get request from user
        const {userMail, userPhone, foodId, quantity, weight, reqPoints} = req.body; 
        //console.log(userMail, userPhone, foodId, quantity, weight, reqPoints)

        //mysql connection
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        if(!userMail || !userPhone || !foodId || !quantity || !weight || !reqPoints){
            return res.status(500).send({
                success: false, 
                message: "Did not get requires information in volunteer add points api!!!",
            });
        }

        const sql_loginEmail_commands = `SELECT user_name, points FROM USER_INFO WHERE email='${userMail}'` ; 
        connectDB.volQueryObject(sql_loginEmail_commands ,(error, result, data) => {
            if (error) {
                console.error(error);
                res.status(401).send({
                    success: false, 
                    message: "login failed, you may not registered yet!!!"
                })
            } else {
                const uNName = data[0].user_name;
                const pPoints = data[0].points
                if(result == true){
                    const sql_foodSearch = `SELECT identifier_key, food_name, food_id, quantity, weight, expDate FROM ${uNName} WHERE food_id="${foodId}"`;
                    connectDB.volQueryObject(sql_foodSearch ,(error1, result1, data1) => {
                        if (error1) {
                            //console.error(error1);
                            res.status(401).send({
                                success: false, 
                                message: "Please enter a valid foodId!!!"
                            })
                        }else{
                            //console.log(data1.length)
                            if (data1.length == 0){
                                res.status(401).send({
                                    success: false, 
                                    message: "Please enter a valid foodId!!!"
                                })
                            }else{
                                const tot_obj = data1[0];
                                //console.log(data1[0])
                                if (tot_obj.quantity<quantity || tot_obj.weight<weight){
                                    res.status(401).send({
                                        success: false, 
                                        message: "Please enter a valid food weight or quantity!!!"
                                    })
                                }else{
                                    if (tot_obj.quantity==quantity && tot_obj.weight==weight){
                                        //do delete operation
                                        const sql_delete_op = `DELETE FROM ${uNName} WHERE food_id="${foodId}" AND identifier_key=${tot_obj.identifier_key}`
                                        connectDB.queryObject(sql_delete_op , (error2, result2)=>{
                                            if(error2){
                                                console.log("error2: ", error2)
                                                res.status(401).send({
                                                    success: false, 
                                                    message:"All food donation operation failed in vol_process!!!"
                                                });
                                            }else{
                                                const pointsNew = parseInt(pPoints) + parseInt(reqPoints)
                                                const sql_userTable_update = `UPDATE USER_INFO SET points=${pointsNew} WHERE user_name="${uNName}"`;
                                                console.log(pointsNew)
                                                connectDB.queryObject(sql_userTable_update, (error3 , result3)=>{
                                                    if(error3){
                                                        console.log("error3: ", error3)
                                                        res.status(401).send({
                                                            success: false, 
                                                            message:"points update failed in vol_process!!!"
                                                        });
                                                    }else{
                                                        res.status(201).send({
                                                            success: true, 
                                                            message:"Successfully donated all food and update points!!!"
                                                        });
                                                    }
                                                })
                                            }
                                        })
                                    }else if (tot_obj.quantity>quantity && tot_obj.weight>weight){
                                        //do update operation
                                        const newQuantity = tot_obj.quantity - quantity;
                                        const newWeight = tot_obj.weight - weight;
                                        const sql_update_op = `UPDATE ${uNName} SET quantity=${newQuantity}, weight=${newWeight} WHERE identifier_key=${tot_obj.identifier_key} AND food_id="${foodId}"`;
                                        connectDB.queryObject(sql_update_op , (error5, result5)=>{
                                            if(error5){
                                                console.log("error5: ", error5)
                                                res.status(401).send({
                                                    success: false, 
                                                    message:"Some food donation operation failed in vol_process!!!"
                                                });
                                            }else{
                                                const sql_userTable_update = `UPDATE USER_INFO SET points=${parseInt(pPoints)+parseInt(reqPoints)} WHERE user_name="${uNName}"`;
                                                connectDB.queryObject(sql_userTable_update, (error3 , result3)=>{
                                                    if(error3){
                                                        console.log("error3: ", error3)
                                                        res.status(401).send({
                                                            success: false, 
                                                            message:"points update failed in vol_process!!!"
                                                        });
                                                    }else{
                                                        res.status(201).send({
                                                            success: true, 
                                                            message:"Successfully donated some food and update points!!!"
                                                        });
                                                    }
                                                })
                                            };
                                        });
                                    };
                                };
                            };
                        };
                    });
                }else{
                    res.status(201).send({
                        success: false, 
                        message: "login failed, you may not registered yet!!!"
                    })
                }
            }
        });
        //connectDB.removeConnection()

    }catch(error){
        //console.log(`error cause in volunteer add points api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in volunteer add points api",
        });
    }
})

module.exports = router