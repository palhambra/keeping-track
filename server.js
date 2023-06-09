const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
let departmentList = [];
let roleList = [];
let managerList;
let employeeList;
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
);

db.connect(function (err) {
  if (err) throw err;
  console.log(`
  _______  __   __  _______  ___      _______  __   __  _______  _______    _______  ______    _______  _______  ___   _  _______  ______   
 |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |  |       ||    _ |  |   _   ||       ||   | | ||       ||    _ |  
 |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|  |_     _||   | ||  |  |_|  ||       ||   |_| ||    ___||   | ||  
 |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___     |   |  |   |_||_ |       ||       ||      _||   |___ |   |_||_ 
 |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|    |   |  |    __  ||       ||      _||     |_ |    ___||    __  |
 |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___     |   |  |   |  | ||   _   ||     |_ |    _  ||   |___ |   |  | |
 |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|    |___|  |___|  |_||__| |__||_______||___| |_||_______||___|  |_|
 `)
 optionsPrompt();
})


function optionsPrompt() {
  inquirer.prompt([{
    type: "list",
    name: "options",
    message: "Please choose what you would like to do:",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      "Quit"
    ]
  }
  ])
  .then((data) => {
    // console.log(data)
    switch(data.options) {
      case "View All Departments":
        viewDepartments();
        break;
      
      case "View All Roles":
        viewRoles();
        break;

      case "View All Employees":
        viewEmployees();
        break;

      case "Add Department":
        departmentPrompt();
        break;

      case "Add Role":
        rolePrompt(departmentList);
        break;

      case "Add Employee":
        employeePrompt();
        break;

      case "Update Employee Role":
        updateRolePrompt();
        break;
      
      case "Quit":
        db.end();
    }
  })
};

// TODO : Choose view all departments, present table showing department names and department ids
function viewDepartments() {
db.query(`SELECT * FROM department`, function (err, results) {
  // console.log(results);
  console.table(results);
  optionsPrompt();
})
};

function updateDepartment() {
  db.query(`SELECT * FROM department`, function (err, results){
    // console.log(results)
    
    departmentList = results.map(department => department.name)
    // console.log(departmentList)
    // }
  });
};
// TODO : Choose view all roles, present job title, role id, department role belongs to, and salary for role
function viewRoles() {
// db.query(`SELECT role.title, department.name AS department_name, role.salary FROM role JOIN department ON role.department_id = department.id;`, function (err, results) {
  db.query(`SELECT * FROM role`, function (err, results) {

// console.log(results);
  console.table(results);
  optionsPrompt();
})
};

function updateRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    // console.log(results)
    roleList = results.map(role => role.title)
    // console.log(roleList)
  })
}

// TODO : Choose view all employees, present employee data, including employee ids, first names, last names, job titles, departments, salaries, and manager of employee
function viewEmployees() {
  db.query(`SELECT employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id;`, function (err, results) {
    // console.log(results);
    console.table(results);
    optionsPrompt();
  })
};

// TODO : Choose add department, prompted to enter name of department, then add department to database
function departmentPrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department you would like to add?"
    }
  ])
  .then((data) => {
    console.log(`${data.department} has been added`)
    db.query(`INSERT INTO department (name) VALUES ("${data.department}")`, function (err) {

      updateDepartment();
      optionsPrompt();
    });
    
  })
};



// TODO : Choose add role, prompted to enter name, salary and department for the role, then add role to database
function rolePrompt(departmentList) {
  db.query(`SELECT * FROM department`, function (err, results){
      //  console.log(results)
    departmentList = results.map(department => ({
      name: `${department.name}`,
      value: department.id
    }));
    // console.log(departmentList)
    inquirer.prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role you would like to add?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "list",
        name: "department",
        message: "Which department is this role going to?",
        choices: departmentList // Reminder : this is a placeholder
      }
    ])
    .then((data) => {
      console.log(`${data.role} has been added`)
      // console.log(data)
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.role}", "${data.salary}", "${data.department}" )`, function (err, results) {
        console.log(err)
          optionsPrompt();
        // })
        })
      
    })
    
    
  })
};

// TODO : Choose add employee, prompted to enter the employee's first name, last name, role, and manager, then add employee to database
function employeePrompt() {
  db.query(`SELECT * FROM role`, function (err, results){
    // console.log(results)
 roleList = results.map(role => ({
   name: `${role.title}`,
   value: role.id
 }));
//  console.log(roleList)
  db.query(`SELECT * FROM employee WHERE id IN (7,9)`, function (err, results){
    // console.log(results)
    managerList = results.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }))
    // console.log(managerList)
  
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "list", // Should make a list with choices from "role" from database
      name: "role", // Match role from database? Same as role from role prompt?
      message: "What is the employee's role?",
      choices: roleList // Need to add in all roles somehow // Reminder : this is a placeholder
    },
    {
      type: "list",
      name: "manager",
      message: "Who is their manager?",
      choices: managerList // Reminder : this is a placeholder
    }
  ])

  .then((data) => {
  // console.log(data)
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.role}", "${data.manager}" )`, function (err, results) {
    console.log(err)
      optionsPrompt();
  })
  })
})
})
};

// TODO : Choose update an employee role, prompted to select an employee to update, and update their new role, then update info on database
function updateRolePrompt() {
  db.query(`SELECT * FROM employee`, function (err, results) {
    // console.log(results)
    employeeList = results.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: `${employee.id}`
    }))
    // console.log(employeeList)
    db.query(`SELECT * FROM role`, function (err, results){
      // console.log(results)
   roleList = results.map(role => ({
     name: `${role.title}`,
     value: role.id
   }));
  inquirer.prompt([
    {
      type: "list",
      name: "employee", // Mock up video shows as list but full name, will need to concatenate firstName and lastName some how
      message: "Which employee's role do you want to update?",
      choices: employeeList // Reminder : this is a placeholder
    },
    {
      type: "list",
      name: "role",
      message: "Which role would you like to update them to?",
      choices: roleList // Reminder : this is a placeholder
    }
  ])
  .then((data) => {
    // console.log(data)
    db.query(`UPDATE employee SET role_id = ${data.role} WHERE id = (${data.employee})`, function (err, results){
      db.query(`SELECT * FROM employee`, function (err, results) {
        // console.log(results)
      optionsPrompt();
    })
  })
})
  })
  } )}


