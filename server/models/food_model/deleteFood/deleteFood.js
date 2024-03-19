const express = require("express")
const DatabaseObj = require("../../../config/database")

//router OBJECT
const router = express.Router()

router.post("/deleteFood" , (req , res)=>{
    try{
        const {uName, deleteOrNot, foodId, foodKey} = req.body
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        if(!uName || !deleteOrNot ||!foodId ||!foodKey || foodKey==-1){
            return res.status(404).send({
                success: false, 
                message: "The required information is not delivered for delete food!!!",
            });
        }
        const sql_deleteFood_commands = `DELETE FROM ${uName} WHERE food_id="${foodId}" AND identifier_key=${foodKey}` ; 
        connectDB.queryObject(sql_deleteFood_commands, (error, result)=>{
            if(error){
                //console.log("1111111")
                return res.status(402).send({
                    success: false, 
                    message: "error in database communication while deleting food!!!",
                });
            }else{
                //console.log("222222")
                return res.status(201).send({
                    success: true, 
                    message: "Food deleted!!!",
                });
            }
        })
    }catch(error){
        console.log(`error cause in delete food api ${error}`)
        return res.status(401).send({
            success: false, 
            message: "error in delete food api",
        });
    }
})
module.exports = router