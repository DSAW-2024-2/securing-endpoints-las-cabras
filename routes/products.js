const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');

let products = [];

router.get('/', authenticate, (req, res) => {
  res.json(products);
});

router.post('/', authenticate, (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.get('/:id', authenticate, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.put('/:id', authenticate, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  Object.assign(product, req.body);
  res.json(product);
});

router.delete('/:id', authenticate, (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;