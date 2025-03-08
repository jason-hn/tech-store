const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Add debugging to check MONGO_URI value
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI || 'Not defined');
    
    // Use explicit options object and handle the undefined case
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techstore';
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 