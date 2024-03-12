
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
//app.use("/api/auth/login/email/user" , require("./models/user_login/login_mail_model"))

//PORT 
const port = process.env.PORT || 8080  //get the "PORT" variable from ".env" folder || if you can't the use port "8080"

//LISTEN
app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
})































