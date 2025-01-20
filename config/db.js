const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log(`mongodb connected successfullt`);
        
    } catch (error) {
        console.error(`MongoDB Connection error`, error.message);
        process.exit(1);
    }
};

module.exports = connectDB;


