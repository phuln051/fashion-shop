// productModel.js
const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true},
  type: { type: String, required: true},
  name_with_type: { type: String, required: true},
  path: { type: String, required: true},
  path_with_type: { type: String, required: true},
  code: { type: String, required: true},
  parent_code: { type: String, required: true},
  isDeleted: { type: Boolean, required: true}
});

const District = mongoose.model('District', districtSchema);

module.exports = District;
