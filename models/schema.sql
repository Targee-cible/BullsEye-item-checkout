DROP DATABASE IF EXISTS target;
CREATE DATABASE target;

USE target;



CREATE TABLE stores (
  id INT NOT NULL AUTO_INCREMENT,
  streetAddress VARCHAR(200) NOT NULL,
  city VARCHAR(200) NOT NULL,
  state VARCHAR(200) NOT NULL,
  zipCode INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(15, 2),
  numOfRatings INT NOT NULL,
  totalNumStars INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE inventory (
  id INT NOT NULL AUTO_INCREMENT,
  store_Id INT NOT NULL,
  product_Id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  color VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
  INDEX (store_Id),
  INDEX (product_Id),
  FOREIGN KEY (store_Id) REFERENCES stores(id),
  FOREIGN KEY (product_Id) REFERENCES product(id)
);


-- CREATE TABLE colors (
--   red VARCHAR(20) NOT NULL,
--   blue VARCHAR(20) NOT NULL,
--   green VARCHAR(20) NOT NULL,
--   orange VARCHAR(20) NOT NULL,
--   black VARCHAR(20) NOT NULL,
--   purple VARCHAR(20) NOT NULL,
-- );

-- CREATE TABLE sizes (
--   small VARCHAR(20) NOT NULL,
--   medium VARCHAR(20) NOT NULL,
--   large VARCHAR(20) NOT NULL,
--   xLarge VARCHAR(20) NOT NULL,
--   xxLarge VARCHAR(20) NOT NULL,
-- )
/*  Execute this file from the command line by typing:
 *    mysql -u root < models/schema.sql
 *  to create the database and the tables.*/
