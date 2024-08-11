const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.createUser);
router.post('/login', userController.findUser);
router.get('/fooditem',userController.findFoodItem);


module.exports = router;