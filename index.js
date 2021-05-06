const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    //my port
    port: 3306,

    //my username
    user: 'root',

    //updating with MySQL password
    password: 'ohcaptain37#',
    database: 'departments'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.end();
});