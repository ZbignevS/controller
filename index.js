const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
// reikia segmentuoti path'us ateity
const signUpRoute = require('./routes/signup.route');
const loginRoute = require('./routes/login.route');
const productRoute = require('./routes/product.route');
const allProductsRoute = require('./routes/allProducts.route');
const addProductRoute = require('./routes/addProduct.route');

const app = express();

//check private key
if (!config.get('myprivatekey')) {
  console.error('no private key');
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect('mongodb://localhost/nodejsauth', { useNewUrlParser: true })
  .then(() => console.log('Mongo bongo'))
  .catch(err => console.error('cant connect to mongo bongo', err));

app.use(express.json());

// routes
app.use('/api/signup', signUpRoute);
app.use('/api/login', loginRoute);
app.use('/api/product', productRoute);
app.use('/api/all-products', allProductsRoute);
app.use('/api/add-product', addProductRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('${port}'));
