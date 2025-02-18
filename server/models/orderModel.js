const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      bookName: String,
      bookGenre: String,
      // price: Number,
      // quantity: { type: Number, default: 1 },
    },
  ],
  // totalAmount: { type: Number, required: true },
  // status: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
