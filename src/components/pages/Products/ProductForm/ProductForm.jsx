import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PackagePlus, Save } from 'lucide-react';
import { Button, Input } from '../../../atoms';
import { productService } from '../../../../services/api';
import { useApi } from '../../../../hooks';

const ProductForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { execute: fetchProduct, loading: fetchingProduct } = useApi(productService.getById);
  const { execute: saveProduct, loading: savingProduct, error } = useApi(
    isEdit ? productService.update : productService.create,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      category_name: '',
      price: '',
      stock: '',
      image: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!isEdit || !id) return;

    const loadProduct = async () => {
      const result = await fetchProduct(id);
      if (result.success) {
        const product = result.data?.data;
        reset({
          name: product?.name ?? '',
          category_name: product?.category?.name ?? '',
          price: product?.price ?? '',
          stock: product?.stock ?? '',
          image: product?.image ?? '',
          description: product?.description ?? '',
        });
      }
    };

    loadProduct();
  }, [fetchProduct, id, isEdit, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    const result = isEdit ? await saveProduct(id, payload) : await saveProduct(payload);
    if (result.success) {
      navigate('/products');
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      <button
        type="button"
        onClick={() => navigate('/products')}
        className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mb-4"
      >
        <ArrowLeft size={16} /> Kembali ke daftar produk
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h1>
        <p className="text-gray-500 mb-6">Lengkapi data produk untuk ditampilkan di etalase bisnis Anda.</p>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Produk"
            placeholder="Contoh: Keripik Pisang"
            error={errors.name?.message}
            {...register('name', { required: 'Nama produk wajib diisi' })}
          />
          <Input
            label="Kategori"
            placeholder="Contoh: Makanan"
            error={errors.category_name?.message}
            {...register('category_name', { required: 'Kategori wajib diisi' })}
          />
          <Input
            label="Harga"
            type="number"
            placeholder="25000"
            error={errors.price?.message}
            {...register('price', {
              required: 'Harga wajib diisi',
              min: { value: 1, message: 'Harga minimal 1' },
            })}
          />
          <Input
            label="Stok"
            type="number"
            placeholder="100"
            error={errors.stock?.message}
            {...register('stock', {
              required: 'Stok wajib diisi',
              min: { value: 0, message: 'Stok tidak boleh negatif' },
            })}
          />
          <Input
            label="URL Gambar"
            placeholder="https://..."
            containerClassName="md:col-span-2"
            {...register('image')}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              rows={4}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Deskripsi singkat produk"
              {...register('description')}
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <Button type="button" variant="secondary" onClick={() => navigate('/products')}>
              Batal
            </Button>
            <Button type="submit" isLoading={savingProduct || fetchingProduct} leftIcon={isEdit ? Save : PackagePlus}>
              {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductForm;
