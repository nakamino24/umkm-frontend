import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, LogIn } from 'lucide-react';
import useAuthStore from '../../../store/slices/authSlice';
import AuthLayout from '../../templates/AuthLayout/AuthLayout.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Input from '../../atoms/Input/Input.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    clearError();
  }, [clearError, isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout title="UMKM Indonesia" subtitle="Masuk ke dashboard Anda">
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          leftIcon={Mail}
          placeholder="contoh@email.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email wajib diisi' })}
        />

        <Input
          label="Password"
          type="password"
          leftIcon={Lock}
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', { required: 'Password wajib diisi' })}
        />

        <Button type="submit" fullWidth isLoading={isLoading} leftIcon={LogIn}>
          Masuk
        </Button>
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
