# MySQL Part 2

```sql
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
```

```sql
INSERT INTO `products` (shop_id, name, price)
VALUES
	(1, 'Apple', 10),
	(1, 'Orange', 11),
	(1, 'Grape', 20),
	(2, 'Shrimp', 50),
	(2, 'Chicken Egg', 5);
```

```sql
INSERT INTO `products` (shop_id, name, price)
VALUES
	(4, 'Mango', 10),
	(4, 'Lemon', 11),
	(4, 'Blueberry', 20)
```

```sql
SELECT * FROM products 
JOIN shops ON products.shop_id = shops.id 
WHERE products.shop_id = 1;
```

```sql
SELECT p.*, s.name as product_of_shop FROM products p
JOIN shops s ON p.shop_id = s.id 
WHERE p.shop_id = 1;

SELECT p.*, s.name as product_of_shop FROM products p
JOIN shops s ON p.shop_id = s.id 
WHERE p.shop_id = 2;
```

```sql
SELECT p.*, s.name as product_of_shop, s.address as shop_address FROM products p
JOIN shops s ON p.shop_id = s.id 
WHERE s.address = 'Palu';


SELECT p.*, s.name as product_of_shop, s.address as shop_address FROM products p
JOIN shops s ON p.shop_id = s.id 
WHERE s.address = 'Bali';

SELECT p.*, s.name as product_of_shop, s.address as shop_address FROM products p
JOIN shops s ON p.shop_id = s.id 
WHERE s.address = 'Bandung';
```
