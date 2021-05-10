DROP DATABASE IF EXISTS departments_DB;

CREATE DATABASE departments_DB;

USE departments_DB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT(10),
    FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(15),
    last_name VARCHAR(20),
    manager_id INT(20),
    FOREIGN KEY (manager_id) REFERENCES employees (id) ON DELETE SET NULL,
    role_id VARCHAR(10),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    PRIMARY KEY(id)
);


INSERT INTO departments (name)
VALUES ('retail'), ('shipping'), ('orders'), ('support');


INSERT INTO roles (title, salary, department_id)
VALUES ('cashier',20000,1), ('driver',34000,2), ('data_entry',26000,3), ('service',28000,4);


INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ('Jim','Smith',NULL,1), ('Lisa','Jackson',1,1),('Jack','Vorhees',1,2);