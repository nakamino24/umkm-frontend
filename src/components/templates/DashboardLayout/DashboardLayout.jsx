import React from 'react';
import Sidebar from '../../organisms/Sidebar/Sidebar.jsx';

const DashboardLayout = ({ children }) => {
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