// src/store/slices/authSlice.js
import { create } from 'zustand';
import { authService } from '../../services/api';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      const { data } = response.data;
      localStorage.setItem('token', data.token);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login gagal';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(userData);
      const { data } = response.data;
      localStorage.setItem('token', data.token);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registrasi gagal';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }
    try {
      const response = await authService.getUser();
      set({ user: response.data.data, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      set({ isAuthenticated: false, user: null });
    }
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore;