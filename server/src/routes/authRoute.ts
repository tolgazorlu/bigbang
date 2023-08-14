const {Register, Login} = require('../controllers/authController')
const {UserVerification} = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.post('/', UserVerification)
router.post('/register', Register)
router.post('/login', Login)

module.exports = router