// src/hooks/useApi.js
import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiFunction(...params);
      setData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

// Hook for paginated data
export const usePaginatedApi = (apiFunction) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const fetch = useCallback(async (page = 1, newFilters = {}) => {
    setLoading(true);
    const mergedFilters = { ...filters, ...newFilters, page };
    
    try {
      const response = await apiFunction(mergedFilters);
      setData(response.data.data);
      setMeta(response.data.meta || {});
      setFilters(mergedFilters);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  }, [apiFunction, filters]);

  const refresh = useCallback(() => {
    fetch(meta.current_page);
  }, [fetch, meta.current_page]);

  return { data, meta, loading, filters, fetch, refresh, setFilters };
};