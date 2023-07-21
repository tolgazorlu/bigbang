const {Register} = require('../controllers/authController')
const router = require('express').Router()

router.post('/register', Register)

module.exports = router