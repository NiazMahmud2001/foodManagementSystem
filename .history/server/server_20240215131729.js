
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const colors = require("colors")
const connectDB = require("./config/database")
var mysql = require('mysql');
const morgan = require("morgan");

//DOTENV
dotenv.config()

//mysql connection

//REST Objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))




//PORT 
const port = process.env.PORT || 8080  //get the "PORT" variable from ".env" folder || if you can't the use port "8080"

//LISTEN
app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
})































