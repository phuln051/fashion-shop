// productModel.js
const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true},
  type: { type: String, required: true},
  name_with_type: { type: String, required: true},
  code: { type: String, required: true},
  isDeleted: { type: Boolean, required: true}

  
});

const Province = mongoose.model('Province', provinceSchema);

module.exports = Province;
