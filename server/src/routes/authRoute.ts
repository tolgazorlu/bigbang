import { Router } from "express"
import { isAuth } from "../utils/isAuth"
import { isAdmin } from "../utils/isAdmin"

const {Register, Login, Profile, getUsers} = require('../controllers/authController')
const {UserVerification} = require('../middlewares/authMiddleware')
const router: Router = require('express').Router()

router.post('/', UserVerification)
router.get('/allUsers', getUsers) // add isAdmin
router.post('/register', Register)
router.post('/login', Login)
router.put('/profile', isAuth, Profile)


module.exports = router