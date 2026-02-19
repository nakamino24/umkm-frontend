import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import useAuthStore from '../../../store/slices/authSlice';
import AuthLayout from '../../templates/AuthLayout/AuthLayout.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Input from '../../atoms/Input/Input.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    clearError();
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout title="UMKM Indonesia" subtitle="Masuk ke dashboard Anda">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              {...register('email', { required: 'Email wajib diisi' })}
              type="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="contoh@email.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              {...register('password', { required: 'Password wajib diisi' })}
              type="password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Masuk'}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;