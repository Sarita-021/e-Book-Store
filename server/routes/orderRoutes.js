// routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getOrdersByUser,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/create", createOrder);
router.get("/:userId", getOrdersByUser);

module.exports = router;
