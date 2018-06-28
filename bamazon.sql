DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NULL,
department_name VARCHAR (100) NULL,
price DECIMAL (8,2) NULL,
stock_quantity INTEGER (40) NULL,
PRIMARY KEY (item_id)
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Empathy Box', 'health' , 999.99, 100),
        ('Hot Fries', 'food', 2.00, 20),
        ('Hologram', 'electronics', 25.99, 50),
        ('Frozen Pizza', 'food', 6.99, 100),
        ('Filtered Water', 'food', 20.99, 75),
        ('Futurama Disc Set', 'entertainment', 75.00, 25),
        ('E-Book Reader', 'electronics', 99.99, 20),
        ('Hover Board', 'electronics', 199.99, 15),
        ('3D Printer', 'electronics', 59.99, 100),
        ('Lavender Tea', 'food', 7.99, 50);
        


