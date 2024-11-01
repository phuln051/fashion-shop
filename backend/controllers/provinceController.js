

const Province = require('../models/provinceModel');
const asyncHandler = require('express-async-handler');

const getProvinces = asyncHandler(async (req, res) => {
  const provinces = await Province.find({});
  res.status(200).json(provinces);
});

module.exports = {
  getProvinces,
  
};
