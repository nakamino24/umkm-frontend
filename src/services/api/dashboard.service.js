// src/services/api/dashboard.service.js
import apiClient from './client';

export const dashboardService = {
  getStats: () => apiClient.get('/dashboard/stats')
};