import React from 'react';

// مكون عرض الأيقونات من مجلد public/icons
const Icon = ({ 
  name, 
  size = 'md', 
  alt = '', 
  className = '',
  onClick,
  active = false
}) => {
  
  // تحديد حجم الأيقونة
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  };

  // تحديد المسار حسب اسم الأيقونة
  const getIconPath = () => {
    // أيقونات السلة (لها مسار خاص)
    if (name.includes('cart')) {
      if (name === 'cart-main' || name === 'cart-main-default') return '/icons/main-header/cart-default.png';
      if (name === 'cart-main-active') return '/icons/main-header/cart-active.png';
      if (name === 'cart-bottom' || name === 'cart-bottom-default') return '/icons/bottom-bar/cart-default.png';
      if (name === 'cart-bottom-active') return '/icons/bottom-bar/cart-active.png';
    }
    
    // أيقونات التواصل
    const socialIcons = ['facebook', 'instagram', 'tiktok', 'youtube', 'whatsapp'];
    if (socialIcons.includes(name)) {
      return `/icons/${name}.png`;
    }
    
    // باقي الأيقونات
    return `/icons/${name}.png`;
  };

  const iconPath = getIconPath();
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <img
      src={iconPath}
      alt={alt || name}
      className={`${sizeClass} ${className} ${active ? 'opacity-100' : 'opacity-90'} object-contain transition-all duration-200`}
      onClick={onClick}
      loading="lazy"
      onError={(e) => {
        console.log(`⚠️ أيقونة غير موجودة: ${iconPath}`);
        e.target.style.display = 'none';
      }}
    />
  );
};

export default Icon;