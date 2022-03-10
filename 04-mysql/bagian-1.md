# MySQL Part 1

### Create table

```sql
CREATE TABLE `shops` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(120) NOT NULL,
	address TEXT NOT NULL,
	phone varchar(12),
	PRIMARY KEY (id)
);
```

```sql
CREATE TABLE `shops` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(120) NOT NULL,
	address TEXT NOT NULL,
	phone varchar(12),
	PRIMARY KEY (id)
) ENGINE=InnoDB;
```

### Insert data
```sql
INSERT INTO `shops` (name, address, phone)
VALUES ('Blilii', 'Palu', '+62855226678');

INSERT INTO `shops` 
    (name, address, phone)
VALUES 
    ('Google Shop', 'Palu', '+6285255'), 
    ('Fb Shop', 'Bandung', '+62855226699');
```

### Read data
```sql
SELECT * FROM `shops`


SELECT * FROM `shops` WHERE id=1;
SELECT * FROM `shops` WHERE id>1;
```

### Update data
```sql
UPDATE `shops` SET `shops`.`name`='Blili billi' WHERE `shops`.`id`=1;


UPDATE `shops` SET 
    `shops`.`name`='Blili billi', 
    `shops`.`address` = 'Bali',
    `shops`.`phone` = '6285255222'
WHERE `shops`.`id`=1;
```

### DELETE
```sql
DELETE FROM `shops` WHERE `shops`.`id`=3;
```
