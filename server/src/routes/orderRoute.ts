import { Router } from "express";
import { isAuth } from "../utils/isAuth";
import { isAdmin } from "../utils/isAdmin";

const { createOrder, getOrder, payOrder, getOrderHistory, getSummary, getOrders, deliverOrder } = require('../controllers/orderController')
const router: Router = require('express').Router()

//Admin
router.get('/summary', isAuth, isAdmin, getSummary)
router.get('/all', isAuth, isAdmin, getOrders)

//User
router.post('/createOrder', isAuth, createOrder)
router.get('/history', isAuth, getOrderHistory)


router.get('/:id', isAuth, getOrder)
router.put('/:id/pay', isAuth, payOrder)
router.put('/:id/deliver', isAuth, deliverOrder)



module.exports = router;