import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, fullWidth = false, className = '', type = 'button', loading = false }) => {
  const variantStyles = {
    primary: 'bg-[#FF8A5C] text-white hover:bg-[#E67A4F]',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    whatsapp: 'bg-green-600 text-white hover:bg-green-700',
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled || loading} whileTap={{ scale: 0.95 }} className={`${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} rounded-lg font-medium transition-colors duration-200 ${className}`}>
      {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : children}
    </motion.button>
  );
};

export default Button;