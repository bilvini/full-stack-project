const express = require('express');
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Create Expense Route
router.post('/', verifyToken, async (req, res) => {
  const { amount, description } = req.body;
  const userId = req.user;

  const expense = new Expense({ amount, description, userId });
  await expense.save();

  res.status(201).json({ message: 'Expense created successfully', expense });
});

// Get All Expenses Route
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user;
  const expenses = await Expense.find({ userId });

  res.json({ expenses });
});

// Update Expense Route
router.put('/:id', verifyToken, async (req, res) => {
  const { amount, description } = req.body;
  const expense = await Expense.findById(req.params.id);

  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  expense.amount = amount;
  expense.description = description;
  await expense.save();

  res.json({ message: 'Expense updated successfully', expense });
});

// Delete Expense Route
router.delete('/:id', verifyToken, async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  await expense.remove();

  res.json({ message: 'Expense deleted successfully' });
});

module.exports = router;
