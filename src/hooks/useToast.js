// src/hooks/useToast.js
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message) => {
    return addToast(message, 'success');
  }, [addToast]);

  const error = useCallback((message) => {
    return addToast(message, 'error');
  }, [addToast]);

  const warning = useCallback((message) => {
    return addToast(message, 'warning');
  }, [addToast]);

  const info = useCallback((message) => {
    return addToast(message, 'info');
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};