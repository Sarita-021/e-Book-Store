const express = require('express');
const { getALLUsers, registerController, loginController } = require('../controllers/userController');

// router object 
const router = express.Router();

//get all users || get 
router.get('/all-users', getALLUsers)

// creat user || post
router.post('/register', registerController)

// login || post 
router.post('/login', loginController)

module.exports = router