// src/services/api/auth.service.js
import apiClient from './client';

export const authService = {
  login: (credentials) => apiClient.post('/login', credentials),
  register: (data) => apiClient.post('/register', data),
  logout: () => apiClient.post('/logout'),
  getUser: () => apiClient.get('/user')
};