const express = require('express');
const router = express.Router();

const productService = require('../services/product.service');

// GET /product -> returns all products
router.get('/', (req, res) => {
  res.send(productService.getAllProducts());
});

// GET /product/:id -> returns a product by id
router.get('/:id', (req, res) => {
  res.send(productService.getProductById(req.params.id));
});

// POST /product -> creates a new product
router.post('/', (req, res) => {
  res.send(productService.createProduct(req.body));
});

// PUT /product/:id -> updates a product by id
router.put('/:id', (req, res) => {
  res.send(productService.updateProduct(req.params.id, req.body));
});

// DELETE /product/:id -> deletes a product by id
router.delete('/:id', (req, res) => {
  res.send(productService.deleteProduct(req.params.id));
});

module.exports = router;