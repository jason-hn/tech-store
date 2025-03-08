const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  createProductReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);

router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createProductReview);

module.exports = router; 