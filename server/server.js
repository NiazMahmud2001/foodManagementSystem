
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const colors = require("colors")
var mysql = require('mysql');
const morgan = require("morgan");

//REST Objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//ROUTES
app.use("/api/auth/reg/user" , require("./models/user_reg_model/reg_model"))
app.use("/api/auth/login/email/user" , require("./models/user_login/login_mail_model"))
app.use("/api/auth/login/email/volunteer" , require("./models/vol_login/vol_login"))
app.use("/api/auth/login/phone/user" , require("./models/user_login/login_phone_model"))
app.use("/api/auth/register/food/UserFood" , require("./models/food_model/register_food/food_register"));
app.use("/api/auth/fetch/food/allFood" , require("./models/food_model/fetch_food/fetch_food"));
app.use("/api/auth/fetch/foodEdit/edit_foods" , require("./models/food_model/editFood/editFood"));
app.use("/api/volunteer/update/points/onReq" , require("./models/Vol_process/vol_process"));
app.use("/api/auth/delete/food/api/deleteFood" , require("./models/food_model/deleteFood/deleteFood"));
app.use("/api/auth/verify/mail" , require("./models/mailVerification/VerificarionMail"));
app.use("/api/auth/usrInfo/fetch" , require("./models/fechUserInfo/FetchInfo"));


//PORT 
const port = process.env.PORT || 8080  //get the "PORT" variable from ".env" folder || if you can't the use port "8080"

//LISTEN
app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
})































