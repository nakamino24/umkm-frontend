import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../../molecules/ProductCard/ProductCard.jsx';
import SearchBar from '../../../molecules/SearchBar/SearchBar.jsx';
import { Button, Loading } from '../../../atoms';
import ConfirmModal from '../../../organisms/ConfirmModal/ConfirmModal.jsx';
import { usePaginatedApi, useConfirm } from '../../../../hooks';
import { productService } from '../../../../services/api';

export const ProductList = () => {
  const navigate = useNavigate();
  const { data: products, loading, fetch, filters, setFilters } = usePaginatedApi(productService.getAll);
  const confirmDelete = useConfirm();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleSearch = (value) => {
    const nextFilters = { ...filters, search: value };
    setFilters(nextFilters);
    fetch(1, nextFilters);
  };

  const handleDelete = (product) => {
    confirmDelete.confirm({
      title: 'Hapus Produk',
      message: `Apakah Anda yakin ingin menghapus "${product.name}"?`,
      onConfirm: async () => {
        try {
          await productService.delete(product.id);
          fetch();
        } catch {
          // no-op
        }
      },
    });
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Produk</h1>
          <p className="text-gray-600">Kelola produk UMKM Anda</p>
        </div>
        <Link to="/products/create">
          <Button leftIcon={Plus}>Tambah Produk</Button>
        </Link>
      </div>

      <SearchBar
        value={filters.search || ''}
        onChange={handleSearch}
        onClear={() => handleSearch('')}
        placeholder="Cari produk..."
        className="mb-6 max-w-md"
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loading size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(p) => navigate(`/products/${p.id}/edit`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">Belum ada produk. Silakan tambah produk baru.</div>
      )}

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={confirmDelete.close}
        onConfirm={confirmDelete.handleConfirm}
        {...confirmDelete.config}
      />
    </section>
  );
};

export default ProductList;
