const mysql = require('mysql');
const { USER, HOST, CONNECTION_LIMIT, PASSWORD, DATABASE } = require('.');

const db = mysql.createPool({
    connectionLimit : CONNECTION_LIMIT,
    host : HOST,
    user : USER,
    password : PASSWORD,
    database : DATABASE
})

db.getConnection(function(error, connection){
    if(error){
        console.log(error);
    }else{
        console.log('connected as ' + connection.threadId);
    }
})

module.exports = db;