// src/components/molecules/SearchBar/SearchBar.jsx
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../atoms';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Cari...',
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        leftIcon={Search}
        className="pr-10"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;