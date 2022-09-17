DROP DATABASE IF EXISTS employee_organizer;
CREATE DATABASE employee_organizer;

USE employee_organizer;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHANT(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHANT(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHANT(30),
  last_name VARCHANT(30),
  role_id INT,
  manager_id INT
);
