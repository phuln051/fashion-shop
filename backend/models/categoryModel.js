// productModel.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    priority: { type: Number, required: true},
    imageUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
