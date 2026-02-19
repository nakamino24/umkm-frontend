// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/slices/authSlice';

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearError
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      navigate('/dashboard');
    }
    return result;
  };

  const handleRegister = async (data) => {
    const result = await register(data);
    if (result.success) {
      navigate('/dashboard');
    }
    return result;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const requireAuth = () => {
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/login');
      }
    }, [isLoading, isAuthenticated]);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
    requireAuth
  };
};