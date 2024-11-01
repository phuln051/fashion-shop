const express = require('express');
const router = express.Router();
const { getDistrictByParent_code } = require('../controllers/districtController');

// Định nghĩa route cho hàm getDistrictByParent_code
router.get('/:parent_code', getDistrictByParent_code);

module.exports = router;