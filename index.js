const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    //my port
    port: 3306,

    //my username
    user: 'root',

    //updating with MySQL password
    password: 'ohcaptain37#',
    database: 'departments_DB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runProgram()
});

function runProgram() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'what would you like to do?',
            choices: ['view all employees', 'create employee', 'view all roles', 'create role', 'view all departments', 'create department', 'update employee role']
        }
    ])
    .then(function(answers){
        switch(answers.option){
            case 'view all employees':
                viewEmployees();
                break;
            case 'create employee':
                createEmployee();
                break;
            case 'view all departments':
                deptsAll();
                break;
            case 'view all roles':
                rolesAll();
                break;
            case 'search for Employee':
                employee();
                break;
        }
    })
}