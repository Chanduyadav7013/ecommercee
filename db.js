const mysql=require('mysql');
const connection =mysql.createConnection({
    host:process.env.DB_HOST,
    user:'honesingh',
    password:'12345678',
    database:process.env.DB_NAME,
})
connection.connect();
module.exports=connection;