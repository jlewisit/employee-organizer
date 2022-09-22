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

// WELCOME
const welcomeMessage = `WELCOME TO EMPLOYEE ORGANIZER\n`;
const error = `\r\n>> ERR: `;
const noInfoEntered = `No information was entered`;

const welcome = () => {
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'welcome',
      message: welcomeMessage + '\nYou will be able to access and edit information about employees, roles, and departments. Press ENTER to continue.\n'
    },
  ])
  .then(startPrompts());
};

// Populate menu choices to see what user wants to do
// Call appropriate function based on user's choice
const startPrompts = async () => {
  return await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
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

    const addRole = () => {
      return inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Input new ROLE (title).',
          validate: title => {
            if (title) {
              return true;
              } else {
                console.log (error + noInfoEntered + `Please enter a new ROLE (title).`);
                return false;
              }
          },
        },
        {
          name: 'salary',
          type: 'input',
          message: ({title}) => `Input the ${title} SALARY.`,
          validate: salary => {
            if (salary) {
              return true;
            } else {
              ({title}) => console.log (error + noInfoEntered + `Please enter the ${title} SALARY.`);
              return false;
            }
          },
        },
        {
          name: 'department',
          type: 'input',
          message: ({title}) => `Input ${title} DEPARTMENT.`,
        choices: departmentArray()
      },
    ])
    .then((answers) => {
      let departmentID = departmentArray().indexOf(val.department) +1
      connection.query('INSERT INTO role SET ?',
    {
      title: answers.title,
      salary: answers.salary,
      department_id: departmentID
    },
    (err, res) => {
      if(err) throw err;
      console.log(`${res.affectedRows} The Role has been added.\n`);
      startPrompts();
    }
    );
    connection.end;
    })
    };
    
    const addDepartment = () => {
      return inquirer
      .prompt([
        {
          name: 'departmentName',
          type: 'input',
          message: 'Input new DEPARTMENT NAME.',
          validate: departmentName => {
            if (departmentName) {
              return true;
            } else {
              console.log (error + noInfoEntered + `Please enter a new DEPARTMENT NAME.`);
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO department SET ?';
        connection.query(query, [
          {
            department_name: answers.departmentName,
          },
        ],
        (err, res) => {
          if (err) throw err;
        },
        console.log(`${res.affectedRows} The Department has been added\n`)
        );
        connection.end;
      })
    };
          
    // READ (view)
    function viewEmployees() {
      let query = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name`;
      query += `CONCAT (e.first_name, ' ', e.last_name) AS Manager`;
      query += `FROM employee`;
      query += `INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id - role.department_id`;
      query += `LEFT JOIN employee e ON employee.manager_id = e.id`;
      query =+ `ORDER BY last_name ASC`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end;
      })
      startPrompts()
    }
    
    const viewRoles = () => {
      let query = `SELECT * FROM roles`;
      query += `INNER JOIN department ON role.department_id = department.id`;
      query += `ORDER BY title`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end;
      })
      startPrompts()
    }
    
    const viewDepartments = () => {
      let query = `SELECT * FROM departments`;
      query += `ORDER BY department_name`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end;
      })
      startPrompts()
    }
    
    // UPDATE
    const updateEmployeeRole = () => {
      return inquirer
      .prompt([
        {
          name: 'employee',
          type: 'input',
          message: `Select the employee whose ROLE you would like to UPDATE.`,
          choices: employeeArray()
        },
        {
          name: 'role',
          type: 'input',
          message: ({employee}) => `Input ${employee} ROLE.`,
          choices: roleArray()
        },
      ])
      .then(answers => {
        const roleID = roleArray().indexOf(val.role) +1
        const managerID = employeeArray().indexOf(val.employee) +1
        connection.query(
          'INSERT INTO employees SET ?',
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            manager_id: managerID,
            role_id: roleID
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} The Employee has been added.\n`);
          }
        );
        connection.end;
      }),
      startPrompts()
    };
    
    // // Function to initialize app
    // const init = () => welcome()
    
    // // Initialize
    // init()
    // welcome()