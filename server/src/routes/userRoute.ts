import express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();
router.route('/').get(userController.getUser);
router.route('/createUser').post(userController.createUser);

module.exports = router;