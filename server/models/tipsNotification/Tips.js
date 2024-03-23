const express = require("express")
const DatabaseObj = require("../../config/database")


//router OBJECT
const router = express.Router()

router.post("/sendTipsApi" , (req , res)=>{
    const tipsObj = [
        {
            tipId: 123,
            tipCategory: "general",
            tipType: "Plan weekly meals to shop efficiently and reduce food waste",
        },
        {
            tipId: 223,
            tipCategory: "general",
            tipType: "Store older items at the front to prioritize their use"
        },
        {
            tipId: 323,
            tipCategory: "general",
            tipType: "Learn the nuances of expiration dates for smarter food choices"
        },
        {
            tipId: 343,
            tipCategory: "general",
            tipType: "Freeze leftovers promptly to extend their freshness"
        },
        {
            tipId: 412,
            tipCategory: "general",
            tipType: "Transform leftovers creatively for diverse and tasty meals"
        },
        {
            tipId: 202,
            tipCategory: "general",
            tipType: "Serve smaller portions to minimize potential leftovers"
        },
        {
            tipId: 398,
            tipCategory: "general",
            tipType: "Set up composting to recycle organic kitchen waste"
        },
        {
            tipId: 658,
            tipCategory: "general",
            tipType: "Mindfully shop, avoiding bulk purchases of perishables"
        },
        {
            tipId: 978,
            tipCategory: "general",
            tipType: "Consider donating surplus non-perishables to local charities"
        },
        {
            tipId: 838,
            tipCategory: "general",
            tipType: "Opt for frozen or canned alternatives for longer shelf life"
        },
    ];

    try{
        const {tips} = req.body; 

        //mysql connection
        var connectDB = new DatabaseObj();
        connectDB.createConnection();

        if(tips != true){
            return res.status(400).send({
                success: false , 
                message: "Tips notification is restricted from user!!!"
            });
        }

        const randNUm = Math.floor(Math.random() * 11);
        return res.status(200).send({
            success: true , 
            message: tipsObj[randNUm]
        });


    }catch(error){
        console.log(`error cause in register api ${error}`)
        return res.status(500).send({
            success: false, 
            message: "error in Tips api",
            error,
        });
    }
})

module.exports = router