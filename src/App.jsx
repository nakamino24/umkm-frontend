import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/slices/authSlice';

import Register from './components/pages/Register/Register.jsx';
import Login from './components/pages/Login/Login.jsx';
import Dashboard from './components/pages/Dashboard/Dashboard.jsx';
import ProductList from './components/pages/Products/ProductList/ProductList.jsx';
import ProductForm from './components/pages/Products/ProductForm/ProductForm.jsx';
import DashboardLayout from './components/templates/DashboardLayout/DashboardLayout.jsx';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/products/create" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/products/:id/edit" element={<PrivateRoute><ProductForm isEdit /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
