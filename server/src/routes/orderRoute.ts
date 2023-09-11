import { Router } from "express";
import { isAuth } from "../utils/isAuth";

const { createOrder, getOrder, payOrder } = require('../controllers/orderController')
const router: Router = require('express').Router()

router.post('/', isAuth, createOrder)
router.get('/:id', isAuth, getOrder)
router.put('/:id/pay', isAuth, payOrder)



module.exports = router;