

const District = require('../models/districtModel');
const asyncHandler = require('express-async-handler');

const getDistricts = asyncHandler(async (req, res) => {
  const districts = await District.find({});
  res.status(200).json(districts);
});

const getDistrictByParent_code = asyncHandler(async (req, res) => {
    const { parent_code } = req.params; // Lấy mã tỉnh thành từ request params
    const districts = await District.find({ parent_code }); // Tìm các huyện có parent_code trùng với mã tỉnh thành
    res.status(200).json(districts); // Trả về danh sách các huyện
  });
module.exports = {
  getDistricts,
  getDistrictByParent_code
  
};
