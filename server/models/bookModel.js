const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'book name is required']
    },
    genre: {
        type: String,
        required: [true, 'genre is required']
    },
    purchaseLink: {
        type: String,
        required: [true, 'purchase link is required']
    },
    image: {
        type: mongoose.Schema.Types.ObjectId, // Reference to GridFS file
        ref: 'GridFS',
        required: [true, 'cover image required']
    }
}, { timestamps: true })

const bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel;