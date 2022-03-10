const mysql = require('mysql2');

// Membuat koneksi database
// method `createConnection` pada module mysql akan mengembalikan
// object connection yang bisa digunakan untuk melakukan query ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tokped'
});


// method `query` membutuhkan 2 argumen,
//   pertama string, yaitu query mysql
//   kedua callback function, yaitu fungsi yang akan dipanggil
//     ketika query sukses atau gagal
//     parameter `err` pada callback akan bernilai object error bila query gagal
//     dan bernilai undefined bila sukses
//     parameter `results` akan memiliki nilai array bila query sukses
connection.query('SELECT name FROM shops', function (err, results, fields) {
  console.log(err)
  console.log(results);
  console.log(fields);
});


// query SELECT dengan klausa WHERE untuk memfilter hasil query
// berdasarkan column `address`
// Perhatikan, di query ada tanda tanya
// Itu akan digantikan oleh nilai yang kita sediakan pada argumen kedua, array
const queryArgs = ['Palu'];
connection.execute("SELECT * FROM `shops` WHERE address=?", queryArgs, function(err, results) {
  printShops(results)
});


// Contoh query insert
// Menambahkan data ke table shops, dengan menyertakan 3 nilai untuk
// masing-masing column `name`, `address` dan `phone`
const insertArgs = ['Toko Laris', 'Jakarta', '+62852255'];
connection.execute('INSERT INTO shops (name, address, phone) VALUES (?, ?, ?)', insertArgs, function (err, results) {
  console.log(err);
  console.log(results);
});
