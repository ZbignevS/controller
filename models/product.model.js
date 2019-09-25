const Joi = require('joi');
const mongoose = require('mongoose');

//schema mongo
const ProductSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: false
  },
  product_id: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: true
  },
  product_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: false
  },
  product_price: {
    type: Number,
    required: true,
    minlength: 1,
    unique: false
  }
});


const Product = mongoose.model('Product', ProductSchema);

// validations
function validateProduct(product) {
  const schema = {
    model: Joi.string().min(1).max(255).required(),
    product_id: Joi.string().min(1).max(255).required(),
    product_name: Joi.string().min(1).max(255).required(),
    product_price: Joi.string().min(1).required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product; 
exports.validate = validateProduct;