var mysql = require('mysql');

const connectDB = ()=>{
        var connection = mysql.createConnection({
            host     : process.env.HOST,
            user     : process.env.USER,
            password : process.env.PASSWORD,
            database : process.env.DATABASE
          });
          
        connection.connect((error) => {
            if (error) {
              console.error('Error connecting to MySQL database');
            } else {
              console.log('Connected to MySQL database....');
            }
        });
          
          
        //connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        //  if (error) throw error;
        //  console.log('The solution is: ', results[0].solution);
        //});

}


module.exports = connectDB




































