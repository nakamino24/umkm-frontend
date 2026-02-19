// src/components/organisms/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../../store/slices/authSlice';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  BarChart3, Settings, LogOut, ChevronDown, ChevronRight,
  Store, Menu, X
} from 'lucide-react';
import { Button } from '../../atoms';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  {
    icon: Package,
    label: 'Produk',
    submenu: [
      { path: '/products', label: 'Daftar Produk' },
      { path: '/products/create', label: 'Tambah Produk' }
    ]
  },
  {
    icon: ShoppingCart,
    label: 'Penjualan',
    submenu: [
      { path: '/orders', label: 'Pesanan' },
      { path: '/customers', label: 'Pelanggan' }
    ]
  },
  { path: '/settings', icon: Settings, label: 'Pengaturan' }
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderMenuItem = (item, index) => {
    if (item.submenu) {
      const isOpen = openMenus[item.label];
      const hasActiveChild = item.submenu.some(sub => isActive(sub.path));
      
      return (
        <div key={index} className="mb-1">
          <button
            onClick={() => toggleMenu(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
              hasActiveChild ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {isOpen && (
            <div className="ml-4 mt-1 space-y-1">
              {item.submenu.map((sub, subIndex) => (
                <NavLink
                  key={subIndex}
                  to={sub.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition ${
                    isActive(sub.path)
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={index}
        to={item.path}
        onClick={() => setIsMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition mb-1 ${
          isActive(item.path)
            ? 'bg-indigo-600 text-white'
            : 'hover:bg-slate-700'
        }`}
      >
        <item.icon size={20} />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="primary"
        size="icon"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 w-64 bg-slate-800 text-white h-screen overflow-y-auto transition-transform z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Store size={32} className="text-indigo-400" />
            <div>
              <h1 className="text-xl font-bold">UMKM</h1>
              <p className="text-xs text-slate-400">Platform Digital</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-lg font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.business_name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <Button
            variant="ghost"
            fullWidth
            leftIcon={LogOut}
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            Keluar
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;