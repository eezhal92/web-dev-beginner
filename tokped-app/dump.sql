CREATE TABLE `shops` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(120) NOT NULL,
	address TEXT NOT NULL,
	phone varchar(12),
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE `products` (
	id INT NOT NULL AUTO_INCREMENT,
	shop_id INT NOT NULL,
	name VARCHAR(120) NOT NULL,
	price INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (shop_id)
		REFERENCES shops(id)
		ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `shops` (name, address, phone)
VALUES
  ('Blilii', 'Palu', '+62855226678'),
  ('Google Shop', 'Palu', '+6285255'),
  ('Amazon Shop', 'Jakarta', '+6285255'),
  ('Fb Shop', 'Bandung', '+62855226699');

INSERT INTO `products` (shop_id, name, price)
VALUES
	(1, 'Apple', 10),
	(1, 'Orange', 11),
	(1, 'Grape', 20),
	(2, 'Shrimp', 50),
	(2, 'Chicken Egg', 5),
	(4, 'Mango', 10),
	(4, 'Lemon', 11),
	(4, 'Blueberry', 20);
