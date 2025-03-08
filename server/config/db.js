const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI || 'Not defined');
    
    // Remove the deprecated options
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techstore';
    const conn = await mongoose.connect(mongoUri);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 