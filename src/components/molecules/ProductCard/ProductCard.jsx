// src/components/molecules/ProductCard/ProductCard.jsx
import React from 'react';
import { Edit2, Trash2, Package } from 'lucide-react';
import { Button, Badge } from '../../atoms';
import { formatRupiah } from '../../../utils/formatters';

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
  className = ''
}) => {
  const getStockBadge = () => {
    if (product.stock === 0) {
      return <Badge variant="danger">Habis</Badge>;
    }
    if (product.stock < 5) {
      return <Badge variant="warning">Stok Menipis: {product.stock}</Badge>;
    }
    return <Badge variant="success">Stok: {product.stock}</Badge>;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition ${className}`}>
      <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Package size={48} className="text-white opacity-50" />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category?.name}</p>
          </div>
          {getStockBadge()}
        </div>
        
        <p className="text-xl font-bold text-indigo-600 mb-4">
          {formatRupiah(product.price)}
        </p>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={Edit2}
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            leftIcon={Trash2}
            onClick={() => onDelete(product)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;