const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        // Connect to the books.files collection (GridFS)
        const db = mongoose.connection.db;
        const booksCollection = db.collection("books.files");

        const book = await booksCollection.findOne({ _id: new mongoose.Types.ObjectId(bookId) });
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });

        // Extract metadata
        const cartItem = {
            bookId: book._id,
            bName: book.metadata.bName,
            bGenre: book.metadata.bGenre,
            pLink: book.metadata.pLink,
            quantity: 1
        };

        // Upsert (Create cart if it doesn't exist, otherwise update it)
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { items: cartItem } },
            { upsert: true, new: true }
        );

        res.json({ success: true, message: "Book added to cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const removeFromCart=async (req, res) => {
    const { userId, bookId } = req.body;

    console.log(userId, " ", bookId);

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { bookId } } },
            { new: true }
        );

        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        //console.log(cart);
        res.json({ success: true, message: "Book removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getCart=async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }) || { userId, items: [] };
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {addToCart, removeFromCart, getCart}