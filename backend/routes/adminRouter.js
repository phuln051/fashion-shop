const adminController  =require("../controllers/adminController")
const { authenticateToken } = require('../middlewares/auth')
const express = require("express");
const router = express.Router();

router.post("/login", adminController.login);
router.post("/change-password", adminController.changePassword);


module.exports = router;