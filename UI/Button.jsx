import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

// مكون الزر الموحد
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'right',
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  loading = false,
}) => {

  // أنماط الأزرار حسب النوع
  const variantStyles = {
    primary: 'bg-[#FF4D8D] text-white hover:bg-[#E63E7B] active:bg-[#CC2E6B]',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BD5C] active:bg-[#1AA64B]',
    outline: 'border-2 border-[#FF4D8D] text-[#FF4D8D] hover:bg-[#FF4D8D] hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100 active:bg-gray-200',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C]',
  };

  // أحجام الأزرار
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // أحجام الأيقونات حسب حجم الزر
  const iconSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.95 }}
      className={`
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-lg font-medium transition-colors duration-200
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      
      {icon && iconPosition === 'right' && !loading && (
        <Icon name={icon} size={iconSizes[size]} />
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'left' && !loading && (
        <Icon name={icon} size={iconSizes[size]} />
      )}
    </motion.button>
  );
};

export default Button;