// src/utils/formatters.js
export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    ...options 
  };
  return new Date(date).toLocaleDateString('id-ID', defaultOptions);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num);
};