const express = require('express');

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const protect = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { productSchema } = require('../validators/productValidator');

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected
router.post('/', protect, validate(productSchema), createProduct);
router.put('/:id', protect, validate(productSchema), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;