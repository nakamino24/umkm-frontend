// src/components/templates/AuthLayout/AuthLayout.jsx
import React from 'react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🏪 {title}</h1>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;