const express = require('express');

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected

router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;