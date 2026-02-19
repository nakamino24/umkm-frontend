// src/utils/validators.js
export const validators = {
  required: (value) => {
    if (!value || value.toString().trim() === '') {
      return 'Field ini wajib diisi';
    }
    return null;
  },
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Email tidak valid';
    }
    return null;
  },
  
  minLength: (value, min) => {
    if (value.length < min) {
      return `Minimal ${min} karakter`;
    }
    return null;
  },
  
  phone: (value) => {
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Nomor telepon tidak valid';
    }
    return null;
  }
};