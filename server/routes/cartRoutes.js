const express = require("express");
const {addToCart, removeFromCart, getCart} = require("../controllers/cartController")

const router = express.Router();

// 🛒 Add a book to the cart
router.post("/add", addToCart);

// 🗑 Remove a book from the cart
router.post("/remove", removeFromCart);

// 🛍 Get user's cart
router.get("/:userId", getCart);

module.exports = router;
