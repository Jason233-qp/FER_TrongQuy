import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

export const getExpensesByUser = async (userId) => {
  const response = await API.get(`/expenses?userId=${userId}`);
  return response.data;
};

export const getAllExpenses = async () => {
  const response = await API.get('/expenses');
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await API.get(`/expenses/${id}`);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await API.post('/expenses', expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  await API.delete(`/expenses/${id}`);
};

export const updateExpense = async (id, updatedData) => {
  const response = await API.put(`/expenses/${id}`, updatedData);
  return response.data;
};