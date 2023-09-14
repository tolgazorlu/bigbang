import { Router } from "express";
import { isAuth } from "../utils/isAuth";

const { createOrder, getOrder, payOrder, getOrderHistory } = require('../controllers/orderController')
const router: Router = require('express').Router()

router.post('/createOrder', isAuth, createOrder)
router.get('/:id', isAuth, getOrder)
router.put('/:id/pay', isAuth, payOrder)
router.get('/', isAuth, getOrderHistory)

module.exports = router;