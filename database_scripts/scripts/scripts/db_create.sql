CREATE DATABASE delilah_db;

USE delilah_db;

CREATE TABLE users (
  user_id INT(7) UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  fullname VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL, 
  adress VARCHAR(50) NOT NULL,
  user_password VARCHAR(50) NOT NULL, 
  user_admin TINYINT(1) NOT NULL, 
  PRIMARY KEY (user_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE products (
  product_id SMALLINT (6) UNSIGNED NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  product_description VARCHAR (255),
  product_price INT(10) UNSIGNED NOT NULL,
  product_disponibilty TINYINT(1) NOT NULL, 
  PRIMARY KEY (product_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE payment_methods (
  payment_code TINYINT(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  payment_description VARCHAR(20) NOT NULL,
  PRIMARY KEY (payment_code)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE order_status (
  order_status_code TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT,
  order_status_description VARCHAR(20) NOT NULL, 
  PRIMARY KEY (order_status_code)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

  CREATE TABLE orders (
    user_id INT(7) UNSIGNED,
    order_id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    payment_code TINYINT(2) UNSIGNED,
    order_time TIMESTAMP,
    order_status_code TINYINT(1) UNSIGNED,
    order_adress VARCHAR (255) NOT NULL,
    total INT(10) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (order_status_code) REFERENCES order_status (order_status_code),
    FOREIGN KEY (payment_code) REFERENCES payment_methods(payment_code),
    PRIMARY KEY (order_id)
  )ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE order_products (
  order_id INT(10) UNSIGNED,
  product_id SMALLINT(6) UNSIGNED,
  product_quantity TINYINT(3) UNSIGNED NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (order_id),
  FOREIGN KEY (product_id) REFERENCES products (product_id),
  PRIMARY KEY (order_id, product_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;