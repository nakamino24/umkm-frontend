// src/components/molecules/FormField/FormField.jsx
import React from 'react';
import { Input } from '../../atoms';
import { useFormHandler } from '../../../hooks';

export const FormField = ({
  name,
  label,
  type = 'text',
  validation = {},
  helperText,
  leftIcon,
  ...props
}) => {
  // This component is meant to be used with useFormHandler hook
  // The parent component should provide the form context
  
  return (
    <div className="space-y-1">
      <Input
        name={name}
        label={label}
        type={type}
        leftIcon={leftIcon}
        helperText={helperText}
        {...props}
      />
    </div>
  );
};

export default FormField;