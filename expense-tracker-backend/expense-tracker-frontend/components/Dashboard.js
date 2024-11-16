import React, { useState, useEffect } from 'react';
import { getExpenses, deleteExpense } from '../services/api';
import ExpenseForm from './ExpenseForm'; 
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null); 
  const [showForm, setShowForm] = useState(false); 
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getExpenses(token).then((response) => {
        setExpenses(response.data.expenses);
        const data = {
          labels: response.data.expenses.map((expense) => new Date(expense.date).toLocaleDateString()),
          datasets: [{
            label: 'Expenses Over Time',
            data: response.data.expenses.map((expense) => expense.amount),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          }],
        };
        setChartData(data);
      });
    }
  }, []);

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense); // Set the expense to be edited
    setShowForm(true); // Show the form for editing
  };

  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem('token');
    await deleteExpense(id, token);
    setExpenses(expenses.filter((expense) => expense._id !== id)); // Remove from local state
  };

  const handleFormClose = () => {
    setShowForm(false); // Close the form
    setSelectedExpense(null); // Reset selected expense
  };

  const handleRefreshExpenses = () => {
    // Refresh the list of expenses after create/update
    const token = localStorage.getItem('token');
    if (token) {
      getExpenses(token).then((response) => {
        setExpenses(response.data.expenses);
      });
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {showForm && (
        <ExpenseForm
          existingExpense={selectedExpense}
          onClose={handleFormClose}
          refreshExpenses={handleRefreshExpenses}
        />
      )}
      <button onClick={() => setShowForm(true)}>Add Expense</button>
      <Line data={chartData} />
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.description} - ${expense.amount}
            <button onClick={() => handleEditExpense(expense)}>Edit</button>
            <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
