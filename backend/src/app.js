const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ProductHub API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

module.exports = app;