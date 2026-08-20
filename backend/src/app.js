const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Health check endpoint (does not require DB connection)
app.get(['/api/health', '/health', '/api', '/'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ProductHub API is running',
  });
});

// Ensure DB is connected before processing DB-backed routes
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    console.error('DB middleware error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed: ' + err.message,
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/products', productRoutes);

app.use(errorMiddleware);

module.exports = app;
