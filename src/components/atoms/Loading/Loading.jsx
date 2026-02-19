// src/components/atoms/Loading/Loading.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
  className = ''
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-indigo-600`} />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;