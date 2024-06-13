const mongoose = require('mongoose')

const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to Mongodb Database' + mongoose.connection.host);
    } catch (error) {
        console.log('MONGO Connect Error');
        console.log(error)
    }

};

module.exports = connectDB;