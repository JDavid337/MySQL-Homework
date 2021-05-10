const mysql = require('mysql');
const inquirer = require('inquirer');
const { createPromptModule } = require('inquirer');

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
        console.log(answers)
        switch(answers.option){
            case 'view all employees':
                viewEmployees();
                break;
            case 'create employee':
                createEmployee();
                break;
            case 'update employee role':
                updateEmpRole();
                break;
            case 'view all departments':
                deptsAll();
                break;
            case 'create department':
                deptCreate();
                break;
            case 'view all roles':
                rolesAll();
                break;
            case 'create role':
                createRole();
            case 'search for Employee':
                employee();
                break;
        }
    })
}
function viewEmployees () {
    connection.query('SELECT first_name, last_name FROM employees', (err, data) => {
        if (err) throw err;
        console.table(data);
        runProgram();
    }
)}
function deptsAll () {
    connection.query('SELECT name FROM departments', (err, data) => {
        if (err) throw err;
        console.table(data);
        runProgram();
    }
)}
function rolesAll () {
    connection.query('SELECT, title, salary, department_id FROM roles', (err, data) => {
        if (err) throw err;
        console.table(data);
        runProgram();
    }
)}

function createEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'what is the new employees first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'what is the new employees last name?',
        },
        {
            type: 'list',
            option: 'option',
            message: 'what is the employees new job?',
            choices: ['retail', 'shipping', 'orders', 'support']

        }
    ])

    .then((answers) => { 
        connection.query(
            'INSERT INTO employees SET ?', 
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id
            },
            (err) => {
            if (err) throw err;
            console.log('employee created successfully!')
            runProgram();
            }
        )
    })
}