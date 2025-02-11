const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, required: true },
            bName: String,
            bGenre: String,
            pLink: String,
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
