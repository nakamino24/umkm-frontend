// src/components/molecules/StatCard/StatCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200'
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm border border-gray-100 ${variants[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${variant === 'default' ? 'bg-indigo-100' : 'bg-white bg-opacity-50'}`}>
            <Icon className={variant === 'default' ? 'text-indigo-600' : 'text-current'} size={24} />
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          {trend === 'up' ? (
            <>
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-green-600">+{trendValue}</span>
            </>
          ) : (
            <>
              <TrendingDown size={16} className="text-red-500 mr-1" />
              <span className="text-red-600">-{trendValue}</span>
            </>
          )}
          <span className="text-gray-500 ml-1">dari bulan lalu</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;