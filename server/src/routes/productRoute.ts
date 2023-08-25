import express = require('express')
const productController = require('../controllers/productController')

const router = express.Router();
router.route('/').get(productController.getProducts);
router.route('/:slug').get(productController.getProduct);
router.route('/createProduct').post(productController.createProduct);

module.exports = router;