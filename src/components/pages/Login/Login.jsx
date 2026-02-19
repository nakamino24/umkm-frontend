// src/components/pages/Login/Login.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth, useFormHandler, useToast } from '../../../hooks';
import { AuthLayout } from '../../templates';
import { Button, Input } from '../../atoms';

export const Login = () => {
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { success, error: showError } = useToast();

  const form = useFormHandler(
    { email: '', password: '' },
    async (values) => {
      const result = await login(values);
      if (result.success) {
        success('Login berhasil!');
      }
      return result;
    }
  );

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    if (error) {
      showError(error);
      clearError();
    }
  }, [error]);

  return (
    <AuthLayout title="UMKM Indonesia" subtitle="Masuk ke dashboard Anda">
      <form onSubmit={form.handleSubmit} className="space-y-6">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="contoh@email.com"
          leftIcon={Mail}
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.email && form.errors.email}
          required
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          leftIcon={Lock}
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.password && form.errors.password}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading || form.isSubmitting}
        >
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