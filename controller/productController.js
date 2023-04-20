const Product = require('../models/productModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoId = require('../utils/validateMongoId');
const { default: slugify } = require('slugify');

// create Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate(
      { id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// get single product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);

  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// get all product
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getAllProduct = await Product.find();
    res.json(getAllProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// add wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  res.send("add to wishlist")
});

// update rating
const rating = asyncHandler(async (req, res) => {
  res.send("updated rating");
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};