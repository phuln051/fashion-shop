  // productModel.js
  const mongoose = require('mongoose');

  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    material:{ type: String, required: false},
    size:  { type: String, required: false},
    code: { type: String, required: false},
    price: { type: Number, required: true },
    priceOld: { type: Number, required: false },
    discription: { type: String, required: false},
    imageUrl: { type: String, required: true },
    categoryId: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    view: { type: Number, required: false}
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;
