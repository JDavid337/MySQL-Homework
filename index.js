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
    connection.query('SELECT title, salary, department_id FROM roles', (err, data) => {
        if (err) throw err;
        console.table(data);
        runProgram();
    }
)}

const createEmployee = () => {
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
            name: 'option',
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
                role_id: answers.role_id,
                manager_id: answers.manager_id
            },
            (err) => {
            if (err) throw err;
            console.log('employee created successfully!')
            runProgram();
            }
        )
    })
}

const deptCreate = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is the new department name?',

        }
    ])

    .then((answers) => { 
        connection.query(
            'INSERT INTO departments SET ?', 
            answers,
            (err) => {
            if (err) throw err;
            console.log('department created successfully!')
            runProgram();
            }
        )
    })
}

const createRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'title',
            message: 'what is the new title?',
            choices: ['Manager', 'Contractor', 'Employee']
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what will be their annual salary?',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'which department will this new role be located?',
            choices: [{name:'retail', value: 1}, {name: 'shipping', value: 2}, {name: 'orders', value: 3}, {name: 'support', value: 4}]
        } 
    ])

    .then((answers) => { 
        connection.query(
            'INSERT INTO roles SET ?', 
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id
            },
            (err) => {
            if (err) throw err;
            console.log('role created successfully!')
            runProgram();
            }
        )
    })
}

const updateEmpRole = () => {
    connection.query ('SELECT * FROM employees', (err, data) => {
        if (err) throw err;
        inquirer.prompt(
        [{
            type: 'rawlist',
            name: 'employee_id',
            message: 'which employee would you like to select?',
            choices: [{name: 'Jim Smith', value: 1}, {name: 'Lisa Jackson', value: 2} , {name: 'Jack Vorhees', value: 3}, {name: 'asdf asdf', value: 4}, {name: 'John Smith', value: 5}]
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'what will be the new role?',
            choices: [{name: 'cashier', value: 1} , {name: 'driver', value: 2}, {name: 'data_entry', value: 3}, {name: 'service', value: 4}, {name: 'Employee', value: 5}, {name: 'Contractor', value: 6}, {name: 'Employee', value: 7}]
        }]

        )


        .then((answers) => { 
            connection.query(
                'UPDATE employees SET role_id = ? WHERE id = ?', 
                [answers.role_id, answers.employee_id],
                (err) => {
                if (err) throw err;
                console.log('role updated successfully!')
                runProgram();
                }
            )
        })
})}