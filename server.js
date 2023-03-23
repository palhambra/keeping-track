const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
);
optionsPrompt();
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
      "Update Employee Role"
    ]
  }
  ])
  .then((data) => {
    console.log(data)
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
        rolePrompt();
        break;

      case "Add Employee":
        employeePrompt();
        break;

      case "Update Employee Role":
        updateRolePrompt();
        break;
    }
  })
};

// TODO : Choose view all departments, present table showing department names and department ids
function viewDepartments() {

};

// TODO : Choose view all roles, present job title, role id, department role belongs to, and salary for role
function viewRoles() {

};

// TODO : Choose view all employees, present employee data, including employee ids, first names, last names, job titles, departments, salaries, and manager of employee
function viewEmployees() {
  
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
};

// TODO : Choose add role, prompted to enter name, salary and department for the role, then add role to database
function rolePrompt() {
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
      choices: ["list of all departments"] // Reminder : this is a placeholder
    }
  ])
};

// TODO : Choose add employee, prompted to enter the employee's first name, last name, role, and manager, then add employee to database
function employeePrompt() {
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
      choices: ["list of all roles"] // Need to add in all roles somehow // Reminder : this is a placeholder
    },
    {
      type: "list",
      name: "manager",
      message: "Who is their manager?",
      choices: ["list of all managers"] // Reminder : this is a placeholder
    }
  ])
};

// TODO : Choose update an employee role, prompted to select an employee to update, and update their new role, then update info on database
function updateRolePrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "", // Mock up video shows as list but full name, will need to concatenate firstName and lastName some how
      message: "Which employee's role do you want to update?",
      choices: ["list of employees first & last names"] // Reminder : this is a placeholder
    },
    {
      type: "list",
      name: "role",
      message: "Which role would you like to update them to?",
      choices: ["list of all roles"] // Reminder : this is a placeholder
    }
  ])
}

