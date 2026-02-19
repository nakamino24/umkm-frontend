// src/hooks/useFormHandler.js
import { useState, useCallback } from 'react';

export const useFormHandler = (initialValues = {}, onSubmitCallback) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const setError = useCallback((name, message) => {
    setErrors(prev => ({
      ...prev,
      [name]: message
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    setTouched(Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {}));

    try {
      const result = await onSubmitCallback(values);
      return result;
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmitCallback]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setError,
    reset,
    setValues
  };
};