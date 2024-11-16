import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Signup API call
export const signup = async (data) => {
  return await axios.post(`${API_URL}/auth/signup`, data);
};

// Login API call
export const login = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

// Get Expenses
export const getExpenses = async (token) => {
  return await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Create Expense
export const createExpense = async (data, token) => {
  return await axios.post(`${API_URL}/expenses`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Delete Expense
export const deleteExpense = async (id, token) => {
  return await axios.delete(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
