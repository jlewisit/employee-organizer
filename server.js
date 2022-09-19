// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// IMPORT DEPENDENCIES
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer
const inquirer = require('inquirer');
// Import console.table
const cTable = require('console.table');

require('dotenv').config();

// Connect to Database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'DB_NAME'
});

connection.connect(err => {
  if (err) throw err;
});

// Populate menu choices to see what user wants to do
// Call appropriate function based on user's choice
const initiateUserPrompts = async () => {
  return await inquirer
  .prompt([
    {
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'EMPLOYEES: View All',
        'EMPLOYEES: Add',
        'EMPLOYEES: Update Role',

        'ROLES: View All',
        'ROLES: Add',

        'DEPARTMENTS: View All',
        'DEPARTMENTS: Add',
      ],
    },
  ])
.then((answer) => {
  switch (answer.action) { 
    case 'EMPLOYEES: View All':
      viewEmployees();
      break;

    case 'EMPLOYEES: Add':
      addEmployee();
      break;
      
    case 'EMPLOYEES: Update Role':
      updateEmployeeRole();
      break;

    case 'ROLES: View All':
      viewRoles();
      break;
      
    case 'ROLES: Add':
      addRole();
      break;
    
    case 'DEPARTMENTS: View All':
      viewDepartments();
      break;

    case 'DEPARTMENTS: Add':
      addDepartment();
      break;

    default:
      console.log('Invalid action: ${answer.action}');
      break;
  }
 });
};

// Create/Add
const addEmployee = async() => {
  const employee = await inquirer
  .prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Input Employee FIRST NAME.',
      validate: first_name => {
        if (first_name) {
          return true;
        } else {
          console.log (error + noInfoEntered + `Please enter Employee FIRST NAME.`);
          return false;
        }
        },
      },
      {
        name: 'last_name',
        type: 'input',
        message: ({first_name}) => `Input ${first_name} LAST NAME.`,
        validate: last_name => {
          if (last_name) {
            return true;
          } else {
            ({first_name}) => console.log (error + noInfoEntered + `Please enter ${first_name} LAST NAME.`);
            return false;
          }
          },
        },
        {
          name: 'role',
          type: 'list',
          message: ({first_name, last_name}) => `Input ${first_name + '' + last_name} ROLE.`,
          choices: roleArray()
        },
        { 
          name: 'manager',
          type: 'list',
          message: ({first_name, last_name}) => `Input ${first_name + '' + last_name} MANAGER.`,
          choices: employeeArray()          
        },
      ])
      }
    }
  ])
}


// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL Username
//     user: 'root',
//     // TODO: Add MySQL Password
//     password: '',
//     database: 'books_db'
//   },
//   console.log(`Connected to the books_db database.`)
// );

// // Query database using COUNT() and GROUP BY
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//   console.log(results);
// });

// // Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//   console.log(results);
// });

// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
