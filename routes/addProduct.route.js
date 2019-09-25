const { Product, validate } = require('../models/product.model');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let product = await Product.findOne({ product_id: req.body.product_id })
      .catch(error => console.log(error));

    if (product) return res.status(409).send('Product already exists');
  
    product = new Product({
      model: req.body.model,
      product_id: req.body.product_id
    });

    res.status(200).send('ok');
    await product.save();
});

module.exports = router;
