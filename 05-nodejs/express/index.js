const express = require('express');
// membuat object express dengan memanggil fungsi `express()`
const app = express();

// ritual nya mysql, setup koneksi database
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tokped'
});

// ritualnya template engine liquid.
// template engine digunakan untuk membuat html secara dinamis di sisi server
const { Liquid } = require('liquidjs');
const engine = new Liquid();

// integrasi express dengan template engine liquid
app.engine('liquid', engine.express());
app.set('view engine', 'liquid');

// setup dimana menempatkan file-file template
app.set('views', './template_viu');

// Routing

// Routing adalah alamat yg tersedia di aplikasi web kita
// format alamatnya adalah:
//   <VERB> <PATH>
//
//   contoh:
//   - GET   /
//   - GET   /produk-ajax
//   - POST  /create-shop
//      ^          ^
//      |          |
//     VERB      PATH
//
//  kita menggunakan object express  app untuk mendefinisikan routing

// routing 1, GET /
app.get('/', function (req, res) {
  // `req` merupakan object request
  //   berisi informasi yang disertakan oleh client (browser)

  // `res` adalah object untuk melakukan perintah yang berkaitan
  // dengan response

  // Mengembalikan string 'Hello dunia' sebagai response.
  res.send('Hello dunia');
});


// routing 2, GET /produk-ajax ...dst...
app.get('/produk-ajax', function (req, res) {
  // mengirim file html yang statis
  res.sendFile(__dirname + '/html/proooduuuk.html');
});


app.get('/produk-pake-template', function (req, res) {
  connection.query('select * from products', function (err, result) {
    // membuat html string dengan template bernama hahaha.liquid
    // lalu kita mengirimkan data ke template tersebut untuk di render
    // hasil render dikirim ke browser
    res.render('hahaha', { data_produk_ku: result });
  });
});

// routing yang akan mengembalikan response berupa data JSON.
// data JSON ini bisa digunakan oleh halaman web untuk membuat
// tampilan dinamis di sisi client (browser)
app.get('/data-product', function (req, res) {
  connection.query('select * from products', function (err, result) {
    res.send(result);
  });
});

app.listen(3000)
