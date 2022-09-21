USE employee_organizerDB;

-- DEPARTMENT --

INSERT INTO department (id, department_name)
VALUES (01, "Sales & Marketing");

INSERT INTO department (id, department_name)
VALUES (02, "Accounting");

INSERT INTO department (id, department_name)
VALUES (03, "Engineering");


-- -- ROLE --

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (01, "Chief Executive Officer", 500000, 01)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (02, "Director of Marketing", 200000, 01)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (03, "Marketing Manager", 120000, 01)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (04, "Marketing Associate", 70000, 01)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (05, "Director of Accounting", 200000, 02)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (06, "Accounting Manager", 120000, 02)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (07, "Accountant", 70000, 02)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (08, "Director of Engineering", 200000, 03)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (09, "Engineering Manager", 120000, 03)

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (10, "Engineer", 80000, 03)


-- EMPLOYEE --

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, 'Joe', 'Lewis', 01, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (02, 'Maria', 'Sanchez', 02, 01);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (03, 'Penny', 'Scott', 03, 02);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (04, 'James', 'Michael', 04, 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (05, 'Jermaine', 'Jackson', 05, 01);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (06, 'Julio', 'Hernandez', 06, 05);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (07, 'Julie', 'Smith', 07, 06);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (08, 'Nicholas', 'Williams', 08, 01);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (09, 'Anh', 'Phoong', 09, 08);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Jose', 'Garcia', 10, 09);


       
