// DEPARTMENT
INSERT INTO department (id, department_name)
VALUES (1, "Sales & Marketing");

INSERT INTO department (id, department_name)
VALUES (2, "Accounting");

INSERT INTO department (id, department_name)
VALUES (3, "Engineering");


// ROLE 
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Chief Executive Officer", 500000, 1)

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Director of Marketing", 200000, 1)

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Marketing Manager", 120000, 1)

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Marketing Associate", 70000, 1)

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Director of Accounting", 200000, 2)

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Accounting Manager", 120000, 2)

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Accountant", 70000, 2)

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Director of Engineering", 200000, 3)

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Engineering Manager", 120000, 3)

INSERT INTO role (id, title, salary, department_id)
VALUES (10, "Engineer", 80000, 3)


// EMPLOYEE
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Joe', 'Lewis', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Maria', 'Sanchez', 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Penny', 'Scott', 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'James', 'Michael', 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Jermaine', 'Jackson', 5, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Julio', 'Hernandez', 6, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Julie', 'Smith', 7, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, 'Nicholas', 'Williams', 8, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Anh', 'Phoong', 9, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Jose', 'Garcia', 10, 9);


       
