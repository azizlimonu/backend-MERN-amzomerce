const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require('../controller/productController');

// create Product
router.post('/', createProduct)

// get all the product
router.get('/', getAllProduct)

// get single Product
router.get('/:id', getProduct)

// update wishList
router.put('/wishlist', addToWishlist)

// update rating
router.put('/rating', rating)

// update single product
router.put('/:id', updateProduct)

// delete single product
router.delete('/:id', deleteProduct)

module.exports = router;