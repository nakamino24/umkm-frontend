// src/components/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, Package, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../templates/DashboardLayout';
import StatCard from "../../molecules/StatCard/StatCard.jsx";
import DataTable from "../../organisms/DataTable/DataTable.jsx";
import Badge from "../../atoms/Badge/Badge.jsx";
import { dashboardService } from '../../../services/api';
import { useApi } from '../../../hooks';
import { formatRupiah } from '../../../utils/formatters';

export const Dashboard = () => {
  const { data: stats, loading, execute: fetchStats } = useApi(dashboardService.getStats);

  useEffect(() => {
    fetchStats();
  }, []);

  const columns = [
    { key: 'order_code', title: 'Kode' },
    { key: 'customer', title: 'Pelanggan', render: (v) => v?.name },
    { key: 'product', title: 'Produk', render: (v) => v?.name },
    { 
      key: 'total_price', 
      title: 'Total',
      render: (v) => formatRupiah(v)
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (v, row) => (
        <Badge variant={row.status_color}>{row.status_label}</Badge>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Ringkasan bisnis Anda</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Penjualan Hari Ini"
          value={formatRupiah(stats?.data?.today_sales || 0)}
          icon={TrendingUp}
          variant="default"
        />
        <StatCard
          title="Total Pesanan"
          value={stats?.data?.total_orders || 0}
          icon={ShoppingBag}
          variant="default"
        />
        <StatCard
          title="Produk Terjual"
          value={stats?.data?.products_sold || 0}
          icon={Package}
          variant="default"
        />
        <StatCard
          title="Stok Menipis"
          value={stats?.data?.low_stock || 0}
          icon={AlertTriangle}
          variant={stats?.data?.low_stock > 0 ? 'danger' : 'default'}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Pesanan Terbaru</h2>
        </div>
        <DataTable
          columns={columns}
          data={stats?.data?.recent_orders || []}
          loading={loading}
          emptyMessage="Belum ada pesanan"
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;