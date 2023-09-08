import { Router } from "express"

const {Register, Login} = require('../controllers/authController')
const {UserVerification} = require('../middlewares/authMiddleware')
const router: Router = require('express').Router()

router.post('/', UserVerification)
router.post('/register', Register)
router.post('/login', Login)

module.exports = router