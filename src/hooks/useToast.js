import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'success', duration = 3000) => {
      const id = Date.now();
      const newToast = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => removeToast(id), duration);

      return id;
    },
    [removeToast],
  );

  const success = useCallback((message) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message) => addToast(message, 'error'), [addToast]);
  const warning = useCallback((message) => addToast(message, 'warning'), [addToast]);
  const info = useCallback((message) => addToast(message, 'info'), [addToast]);

  return { toasts, addToast, removeToast, success, error, warning, info };
};
