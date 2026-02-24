import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Store, Mail, Phone, Lock, Briefcase } from 'lucide-react';
import useAuthStore from '../../../store/slices/authSlice';
import AuthLayout from '../../templates/AuthLayout/AuthLayout.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Input from '../../atoms/Input/Input.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    clearError();
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const categories = [
    { value: '', label: 'Pilih Kategori Usaha' },
    { value: 'makanan', label: 'Makanan & Minuman' },
    { value: 'fashion', label: 'Fashion & Tekstil' },
    { value: 'kerajinan', label: 'Kerajinan Tangan' },
    { value: 'pertanian', label: 'Pertanian & Perkebunan' },
    { value: 'jasa', label: 'Jasa' },
    { value: 'lainnya', label: 'Lainnya' },
  ];

  return (
    <AuthLayout title="UMKM Indonesia" subtitle="Daftar akun untuk kelola bisnis Anda">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {typeof error === 'string' ? error : 'Terjadi kesalahan saat registrasi'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama Lengkap */}
        <Input
          name="name"
          label="Nama Lengkap"
          placeholder="Nama pemilik usaha"
          leftIcon={User}
          {...register('name', { required: 'Nama wajib diisi' })}
          error={errors.name?.message}
        />

        {/* Nama Usaha */}
        <Input
          name="business_name"
          label="Nama Usaha"
          placeholder="Nama UMKM / Bisnis"
          leftIcon={Store}
          {...register('business_name', { required: 'Nama usaha wajib diisi' })}
          error={errors.business_name?.message}
        />

        {/* Email */}
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="contoh@email.com"
          leftIcon={Mail}
          {...register('email', { 
            required: 'Email wajib diisi',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email tidak valid'
            }
          })}
          error={errors.email?.message}
        />

        {/* Telepon */}
        <Input
          name="phone"
          label="No. Telepon"
          placeholder="08123456789"
          leftIcon={Phone}
          {...register('phone', { 
            required: 'Telepon wajib diisi',
            pattern: {
              value: /^[0-9]{10,13}$/,
              message: 'Nomor telepon tidak valid (10-13 digit)'
            }
          })}
          error={errors.phone?.message}
        />

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori Usaha <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              {...register('category', { required: 'Kategori wajib dipilih' })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Password */}
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Minimal 6 karakter"
          leftIcon={Lock}
          {...register('password', { 
            required: 'Password wajib diisi',
            minLength: {
              value: 6,
              message: 'Password minimal 6 karakter'
            }
          })}
          error={errors.password?.message}
        />

        {/* Konfirmasi Password */}
        <Input
          name="password_confirmation"
          type="password"
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          leftIcon={Lock}
          {...register('password_confirmation', { 
            required: 'Konfirmasi password wajib diisi',
            validate: value => 
              value === password || 'Password tidak cocok'
          })}
          error={errors.password_confirmation?.message}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="mt-6"
        >
          Daftar
        </Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline font-medium">
          Masuk sekarang
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;