import { Router } from "express";
import { isAuth } from "../utils/isAuth";

const { Order } = require('../controllers/orderController')
const router: Router = require('express').Router()

router.post('/', isAuth, Order)


module.exports = router;