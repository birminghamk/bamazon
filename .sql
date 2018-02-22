DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(13,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (id) 

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jenga Classic Game", "Toys & Games", 10.99, 304),
("Clue Game", "Toys & Games", 9.99, 304),
("Sorry! 2013 Edition Game", "Toys & Games", 11.99, 54),
("Sequence Game", "Toys & Games", 14.99, 289),
("5 Second Rule", "Toys & Games", 18.99, 22);

SELECT * FROM products;