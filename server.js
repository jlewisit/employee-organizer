// DEPENDENCIES
// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer
const inquirer = require('inquirer');
// Import console.table
const cTable = require('console.table');

// For connection to database
const connection = require('./config/connection');
const { connect } = require('./config/connection');

// Arrays
const employeeArray = () => {
  const employees = [];
  connection.query('SELECT CONCAT_WS("", employee.first_name, employee.last_name) AS Employee FROM employee ORDER BY Employee ASC', function(err, res) {
    if (err) throw err;
    res.forEach(({Employee}) => employees.push(Employee));
  })
  return employees;
};

const roleArray = () => {
  const roles = [];
  connection.query('SELECT * FROM role', function(err, res) {
    if (err) throw err;
    res.forEach(({title}) => roles.push(title));
  })
  return roles;
};

const departmentArray = () => {
  const departments = [];
  connection.query('SELECT* FROM department', function(err, res) {
    if (err) throw err;
    res.forEach(({department_name}) => departments.push(department_name));
  })
  return departments;
};

const welcome = () => {
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'welcome',
      message: welcomeMsg + '\nYou will be able to access and edit information about employees, roles, and departments. Press ENTER to continue.\n'
    },
  ])
  .then(startPrompts)
};

// Populate menu choices to see what user wants to do
// Call appropriate function based on user's choice
const startPrompts = async () => {
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
      console.log(`Invalid action: ${answer.action}`);
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
      .then((answers) => {
        let roleTitle = answers.role;
        let roleID;
        const findRoleID = () => {
          connection.query('SELECT * FROM role WHERE tile=?',
          [`${roleTitle}`],
          (err, res) => {
            if (err) throw err;
          roleID = res[0].id;
          console.log("roleID", roleID);
        }
      );
};
findRoleID();

let managerName = answers.manager;
let managerID;
const findManagerID = () => {
  connection.query('SELECT employee.id, CONCAT_WS("", employee.first_name, employee.last_name) AS Employee FROM employee HAVING Employee=?'),
  [`${managerName}`],
  (err, res) => {
    if(err) throw err;
    managerID = res[0].id;
    console.log("managerID", managerID);
  }
};
findManagerID();

console.log("ROLE-ID Added before insert query", roleID);
console.log("MANAGER-ID Added before insert query", managerID);

const insertNewEmployee = async () => {
  const mySQLConnection = await connection.query('INSERT INTO employee SET ?',
  {
    first_name: answers.first_name,
    last_name: answers.last_name,
    role_id: roleID,
    manager_id: managerID
  },
  (err, res) => {
    if(err) throw err;
    console.log("INSERT RES", res);
    console.log(`${answers.first_name} ${answers.last_name} was added. \n`);
    startPrompts();
  }
  );
  // connection.end
}
insertNewEmployee();
      });
    };

