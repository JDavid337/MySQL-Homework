DROP DATABASE IF EXISTS departmentsDB;

CREATE DATABASE departmentsDB;

USE departmentsDB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    DepartmentName VARCHAR(45) NULL,
    DepartmentPurpose DECIMAL(10,2) NULL,
    DepartmentManager INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);