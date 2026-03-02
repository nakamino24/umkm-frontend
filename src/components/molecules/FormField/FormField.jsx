import React from 'react';
import { Input } from '../../atoms';

export const FormField = ({ name, label, type = 'text', helperText, leftIcon, ...props }) => {
  return (
    <div className="space-y-1">
      <Input name={name} label={label} type={type} leftIcon={leftIcon} helperText={helperText} {...props} />
    </div>
  );
};

export default FormField;
