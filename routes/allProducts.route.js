const { Product } = require('../models/product.model');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth, async (req, res) => {

    const data = await Product.find()
        .catch(error => console.log(error));

    if (!data) res.status(404).send('Empty');

    res.send(data);
});

module.exports = router;
