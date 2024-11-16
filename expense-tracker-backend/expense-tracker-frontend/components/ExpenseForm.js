import React, { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../services/api'; 

const ExpenseForm = ({ existingExpense, onClose, refreshExpenses }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    if (existingExpense) {
      setAmount(existingExpense.amount);
      setDescription(existingExpense.description);
      setIsUpdating(true);
    } else {
      setAmount('');
      setDescription('');
      setIsUpdating(false);
    }
  }, [existingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!amount || !description) {
      setError('Please fill in both fields');
      return;
    }

    try {
      if (isUpdating && existingExpense) {
        // Update existing expense
        await updateExpense(existingExpense._id, { amount, description }, token);
      } else {
        // Create a new expense
        await createExpense({ amount, description }, token);
      }
      refreshExpenses();
      onClose();  // Close the form after submission
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while saving the expense');
    }
  };

  return (
    <div className="expense-form-container">
      <h3>{isUpdating ? 'Edit Expense' : 'Add New Expense'}</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount" 
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description" 
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">{isUpdating ? 'Update Expense' : 'Add Expense'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
