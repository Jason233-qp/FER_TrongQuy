import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  filteredExpenses: [],
  totalAmount: 0,
  loading: false,
  error: null,
  filter: { category: '', search: '', sort: '' },
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        expenses: action.payload,
        filteredExpenses: action.payload,
        totalAmount: action.payload.reduce((t, p) => t + p.amount, 0),
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'APPLY_FILTER': {
      const { category, search, sort } = state.filter;
      let filtered = [...state.expenses];

      if (category) filtered = filtered.filter(p => p.category === category);
      if (search)
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
        );

      if (sort) {
        switch (sort) {
          case 'name_asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name_desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
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
        filteredExpenses: filtered,
        totalAmount: filtered.reduce((t, p) => t + p.amount, 0),
      };
    }
    case 'ADD_EXPENSE': {
      const newExpenses = [...state.expenses, action.payload];
      return {
        ...state,
        expenses: newExpenses,
        filteredExpenses: newExpenses,
        totalAmount: newExpenses.reduce((t, p) => t + p.amount, 0),
      };
    }
    case 'DELETE_EXPENSE': {
      const updated = state.expenses.filter(p => p.id !== action.payload);
      return {
        ...state,
        expenses: updated,
        filteredExpenses: updated,
        totalAmount: updated.reduce((t, p) => t + p.amount, 0),
      };
    }
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const fetchExpenses = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await api.getExpensesByUser(user.id);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);