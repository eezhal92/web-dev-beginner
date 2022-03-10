const express = require('express');
const bodyParser = require('body-parser');
const { Liquid } = require('liquidjs');

const shopFns = require('./shop-functions');
const connection = require('./db');

const engine = new Liquid();

const app = express();

// setup template engine
app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

// setup static file routes
app.use('/static', express.static(__dirname + '/static'));

// setup parser u/ ambil data dari http request
app.use(bodyParser.urlencoded({ extended: true }));

const addresses = ['Palu', 'Bandung', 'Jakarta', 'Makassar', 'Jogja'];

/**
 * Routing
 */


app.get('/', (req, res) => {
  shopFns.getShops(connection)
    .then((shops) => {
      res.render('home', { foo: 'bar', shops, addresses });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


app.get('/edit-shop/:id', (req, res) => {
  connection.execute(`SELECT * FROM shops WHERE id=?`, [req.params.id], function (error, result) {
    if (error) {
      res.status(500).send(error.message);
      return;
    }
    if (result.length == 0) {
      res.setHeader('Content-Type', 'text/html');
      res.send(error ? error.message : 'not found <a href="/">Kembali</a>');
      return;
    }

    res.render('edit', { shop: result[0], addresses });
  });
});

app.post('/create-shop', (req, res) => {
  const { name, phone, address } = req.body;
  const params = [name, address, phone];
  connection.execute(`INSERT INTO shops (name, address, phone) VALUES (?, ?, ?)`, params, function (error, result) {
    if (error) {
      return res.status(500).send(error.message);
    }

    res.redirect('/');
  });
});

app.post('/update-shop/:shopid', (req, res) => {
  const { name, address, phone } = req.body;
  const params = [name, address, phone, req.params.shopid];
  connection.execute(`UPDATE shops SET name=?, address=?, phone=? WHERE id=?`, params, function (error, result) {
    if (error) {
      res.status(500).send(error.message)
      return;
    }

    if (result.length == 0) {
      res.status(404).send('Not found')
      return;
    }

    res.redirect('/');
  });
});

app.delete('/delete-shop/:shopid', (req, res) => {
  const id = parseInt(req.params.shopid, 10);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  const params = [id];

  connection.execute(`DELETE FROM shops WHERE id=?`, params, function (error, result) {
    if (error) {
      res.status(500).send(error.code + ': ' + error.message)
      return;
    }
    res.sendStatus(200);
  });
});

app.get('/product-catalog', (req, res) => {
  const { keyword } = req.query;
  let q = 'SELECT p.*, s.name as seller FROM products p JOIN shops s ON p.shop_id=s.id';
  let params = [];
  if (keyword) {
    q += ` WHERE p.name LIKE ?`;
    params = [`%${keyword}%`];
  }

  connection.execute(q, params, function (error, result) {
    if (error) {
      res.status(500).send(error.message);
      return;
    }

    res.render('product', { products: result, addresses });
  });

});

app.get('/foobar', (req, res) => {
  res.json({ price: 200, productName: 'asdsdf' })
})

const port = 8080;
app.listen(port, () => {
  console.log('running at localhost:' + port);
});
