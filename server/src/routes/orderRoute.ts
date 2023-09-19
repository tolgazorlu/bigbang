import { Router } from "express";
import { isAuth } from "../utils/isAuth";
import { isAdmin } from "../utils/isAdmin";

const { createOrder, getOrder, payOrder, getOrderHistory, getSummary, getAllProducts } = require('../controllers/orderController')
const router: Router = require('express').Router()

//Admin
router.get('/summary', isAuth, isAdmin, getSummary)

//User
router.post('/createOrder', isAuth, createOrder)
router.get('/history', isAuth, getOrderHistory)


router.get('/:id', isAuth, getOrder)
router.put('/:id/pay', isAuth, payOrder)



module.exports = router;