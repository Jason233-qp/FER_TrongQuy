import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== USER APIs =====
export const getUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await API.put(`/users/${id}`, updatedData);
  return response.data;
};

// ===== PAYMENT APIs =====
export const getPaymentsByUser = async (userId) => {
  const response = await API.get(`/payments?userId=${userId}`);
  return response.data;
};

export const getAllPayments = async () => {
  const response = await API.get('/payments');
  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await API.get(`/payments/${id}`);
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await API.post('/payments', paymentData);
  return response.data;
};

export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
};

export const updatePayment = async (id, updatedData) => {
  const response = await API.put(`/payments/${id}`, updatedData);
  return response.data;
};