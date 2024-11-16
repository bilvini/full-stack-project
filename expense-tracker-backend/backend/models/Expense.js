const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
