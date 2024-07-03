const express = require('express');
const { getALLUsers, registerController, loginController, OTPController, updatePassword } = require('../controllers/userController');
const { getAllBooks, uploadBook, getBookbyId, deleteBook } = require('../controllers/booksController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
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

//get all books 
router.get('/all-books', getAllBooks)

//get single book
router.get('/all-books/:id', getBookbyId)

// add book
router.post('/uploadBook', upload.single('file'), uploadBook)

module.exports = router