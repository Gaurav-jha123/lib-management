const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect('');
        console.log(`mongodb connected successfullt`);
        
    } catch (error) {
        console.error(`MongoDB Connection error`, error.message);
        process.exit(1);
    }
};

module.exports = connectDB;


