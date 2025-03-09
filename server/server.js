// Load environment variables first
require('dotenv').config();

// Then import other dependencies
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TechStore API' });
});

// Error handler middleware
app.use(errorHandler);

// SSL Certificate options
const sslOptions = {
  // key: fs.readFileSync(path.join(__dirname, 'config/certificates/key.pem')),
  // cert: fs.readFileSync(path.join(__dirname, 'config/certificates/cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'config/certificates/localhost+2-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'config/certificates/localhost+2.pem')),
};

// Start server
const PORT = process.env.PORT || 5002;

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});