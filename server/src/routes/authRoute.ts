import { Router } from "express"
import { isAuth } from "../utils/isAuth"

const {Register, Login, Profile} = require('../controllers/authController')
const {UserVerification} = require('../middlewares/authMiddleware')
const router: Router = require('express').Router()

router.post('/', UserVerification)
router.post('/register', Register)
router.post('/login', Login)
router.put('/profile', isAuth, Profile)


module.exports = router