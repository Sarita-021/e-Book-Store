const Order = require("../models/orderModel.js");

exports.createOrder = async (req, res) => {
  const { userId, bookId, bookName } = req.body;
  console.log(bookId);
  try {
    // If book details are provided directly, use them to create the order.
    // You can also check if this book is in the cart if needed, but we're handling it as a direct order.

    // Calculate the total price based on quantity
    // const totalAmount = price * quantity;

    // Create the order items
    const orderItem = {
      bookId,
      bookName,
      // price,
      // quantity,
    };

    // Create a new order
    const newOrder = new Order({
      userId,
      items: [orderItem],
      // totalAmount,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders by userId
exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
