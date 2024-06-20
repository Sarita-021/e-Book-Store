const express = require('express');
const { getALLUsers, registerController, loginController, OTPController, updatePassword } = require('../controllers/userController');

// router object 
const router = express.Router();

//get all users || get 
router.get('/all-users', getALLUsers)

// creat user || post
router.post('/register', registerController)

// login || post 
router.post('/login', loginController)

// recover password
router.post('/send_recovery_email', OTPController)

// updatePassword route
router.post('/updatePassword', updatePassword)

module.exports = router