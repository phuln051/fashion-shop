// routes/categoriesRouter.js
const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.creatCheckout);
router.get('/user/:userId', checkoutController.getCheckoutByUserId);
router.get('/', checkoutController.getAllCheckouts);

module.exports = router;
