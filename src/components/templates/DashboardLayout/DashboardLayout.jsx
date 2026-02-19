// src/components/templates/DashboardLayout/DashboardLayout.jsx
import React from 'react';
import { Sidebar } from '../../organisms';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;