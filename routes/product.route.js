const { Product } = require('../models/product.model');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/:id', auth, async (req, res) => {

    const data = await Product.findById({ _id: req.params.id })
        .catch(error => console.log(error));

    if (!data) res.status(404).send('No such product');

    res.send(data);
});

module.exports = router;
