// src/contexts/MovieContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

// --- Contexts ---
const MovieStateContext = createContext(initialMovieState);
const MovieDispatchContext = createContext(null);

// --- Custom Hooks ---
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// --- Provider ---
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // --- READ: Lấy danh sách phim ---
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const res = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: res.data });
    } catch (err) {
      console.error('Lỗi khi tải danh sách phim:', err);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  // --- READ: Lấy danh sách thể loại ---
  const fetchGenres = useCallback(async () => {
    try {
      const res = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: res.data });
    } catch (err) {
      console.error('Lỗi khi tải danh sách thể loại:', err);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  // --- CREATE / UPDATE ---
  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, editingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          await movieApi.put(`/movies/${editingId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }
        dispatch({ type: 'RESET_FORM' });
        await fetchMovies();
        return { success: true };
      } catch (err) {
        console.error('Lỗi khi tạo/cập nhật phim:', err);
        await fetchMovies();
        return { success: false, message: 'Lỗi khi lưu phim' };
      }
    },
    [fetchMovies]
  );

  // --- DELETE ---
  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        await movieApi.delete(`/movies/${id}`);
        await fetchMovies();
      } catch (err) {
        console.error('Lỗi khi xóa phim:', err);
        await fetchMovies();
      }
    },
    [fetchMovies]
  );

  // --- FILTER: tìm kiếm, lọc, sắp xếp ---
  const applyFilter = useCallback((filters) => {
    dispatch({ type: 'APPLY_FILTER', payload: filters });
  }, []);

  // --- LOAD data khi mở trang ---
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  // --- Gộp các hàm thao tác vào dispatch context ---
  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
    applyFilter, // thêm hàm filter
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

export default MovieProvider;
