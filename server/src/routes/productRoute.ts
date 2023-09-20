import express = require('express')
import { isAuth } from '../utils/isAuth';
import { isAdmin } from '../utils/isAdmin';
const {getProduct, getProducts, getCategory, getSearchProducts, createProduct ,deleteProduct} = require('../controllers/productController')

const router: express.Router = require('express').Router()

router.get('/',getProducts);
router.get('/categories', getCategory);
router.get('/search', getSearchProducts);
router.get('/:slug', getProduct);
router.post('/createProduct', isAuth, isAdmin, createProduct);
router.delete('/:id',isAuth, isAdmin, deleteProduct)

module.exports = router;
