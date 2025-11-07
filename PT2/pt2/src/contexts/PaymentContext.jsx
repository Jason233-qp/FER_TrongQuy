import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

const initialState = {
  payments: [],
  filteredPayments: [],
  totalAmount: 0,
  loading: false,
  error: null,
  filter: { semester: '', course: '', search: '', sort: '' },
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        payments: action.payload,
        filteredPayments: action.payload,
        totalAmount: action.payload.reduce((t, p) => t + p.amount, 0),
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'APPLY_FILTER':
      const { semester, course, search, sort } = state.filter;
      let filtered = [...state.payments];

      if (semester) filtered = filtered.filter(p => p.semester === semester);
      if (course) filtered = filtered.filter(p => p.courseName === course);
      if (search)
        filtered = filtered.filter(p =>
          p.courseName.toLowerCase().includes(search.toLowerCase()) ||
          p.semester.toLowerCase().includes(search.toLowerCase())
        );

      if (sort) {
        switch (sort) {
          case 'course_asc':
            filtered.sort((a, b) => a.courseName.localeCompare(b.courseName));
            break;
          case 'course_desc':
            filtered.sort((a, b) => b.courseName.localeCompare(a.courseName));
            break;
          case 'date_asc':
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
          case 'date_desc':
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case 'amount_asc':
            filtered.sort((a, b) => a.amount - b.amount);
            break;
          case 'amount_desc':
            filtered.sort((a, b) => b.amount - a.amount);
            break;
          default:
            break;
        }
      }

      return {
        ...state,
        filteredPayments: filtered,
        totalAmount: filtered.reduce((t, p) => t + p.amount, 0),
      };
    case 'DELETE_PAYMENT':
      const updated = state.payments.filter(p => p.id !== action.payload);
      return {
        ...state,
        payments: updated,
        filteredPayments: updated,
        totalAmount: updated.reduce((t, p) => t + p.amount, 0),
      };
    default:
      return state;
  }
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  useEffect(() => {
    const fetchPayments = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await api.getAllPayments(); // ✅ không lọc theo userId
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchPayments();
  }, []);

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => useContext(PaymentContext);