import { Router } from "express"
import { isAuth } from "../utils/isAuth"
import { isAdmin } from "../utils/isAdmin"

const {Register, Login, Profile, getUsers, deleteUser} = require('../controllers/authController')
const {UserVerification} = require('../middlewares/authMiddleware')
const router: Router = require('express').Router()

router.get('/', isAuth, isAdmin, getUsers)
router.post('/register', Register)
router.post('/login', Login)
router.put('/profile', isAuth, Profile)
router.delete('/:id',isAuth, isAdmin, deleteUser)


module.exports = router