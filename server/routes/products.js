const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET /products?category=pizza
router.get('/', productsController.getProducts);

// GET /products/:id?category=pizza
router.get('/:id', productsController.getProductById);

module.exports = router;
