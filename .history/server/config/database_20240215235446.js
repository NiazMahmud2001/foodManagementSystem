var mysql = require('mysql');
const dotenv = require("dotenv");

//DOTENV
dotenv.config()


class DatabaseObj{
    constructor(){
        this.connection = mysql.createConnection({
            host     : process.env.HOST,
            user     : process.env.USER,
            password : process.env.PASSWORD,
            database : process.env.DATABASE,
            port     : process.env.PORT_DB
          });
    }
    createConnection(){
        this.connection.connect((error) => {
            if (error) {
              console.error('Error connecting to MySQL database');
              return false;
            } else {
              console.log('Connected to MySQL database....');
              return true;
            }
        });
    } 
    removeConnection(){
        this.connection.end((error)=>{
            if (error) {
                console.error('failed ot disconnect with server!!!');
                return false;
              } else {
                console.log('Successfully disconnected with server ....');
                return true;
              }
        })
    }
}

module.exports = DatabaseObj




































