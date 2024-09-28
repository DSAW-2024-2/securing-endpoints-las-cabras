const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');

let orders = [];

router.get('/', authenticate, (req, res) => {
  res.json(orders);
});


router.post('/', authenticate, (req, res) => {
  const newOrder = req.body;
  newOrder.id = orders.length + 1;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

router.get('/:id', authenticate, (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;
