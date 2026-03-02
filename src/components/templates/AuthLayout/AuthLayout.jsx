import React from 'react';
import { Sparkles, Store } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full" />

      <div className="relative bg-white/95 backdrop-blur p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/60">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 mb-3">
            <Store size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          <div className="inline-flex items-center gap-1 text-xs text-indigo-600 mt-3 bg-indigo-50 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Platform UMKM Modern
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
