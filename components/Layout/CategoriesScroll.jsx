// components/Layout/CategoriesScroll.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CategoriesScroll = ({ onCategorySelect, products = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('boys-economy');
  const scrollRef = useRef(null);

  // دالة للحصول على نطاق السعر المناسب لكل فئة
  const getPriceRange = (categoryId) => {
    switch(categoryId) {
      case 'boys-economy':
      case 'girls-economy':
        return '25-40 درهم';
      case 'boys-premium':
      case 'girls-premium':
        return '45-60 درهم';
      case 'mixed_sets':
        return '60-100 درهم';
      default:
        return '';
    }
  };

  // الفئات (تم حذف mamati-market)
  const categories = [
    { 
      id: 'boys-economy', 
      title: 'أولاد اقتصادي', 
      avatar: '/icons/boy-economy-avatar.png', 
      icon: '/icons/eco.png', 
      color: 'bg-white', 
      borderColor: 'border-gray-300'
    },
    { 
      id: 'boys-premium', 
      title: 'أولاد ممتاز', 
      avatar: '/icons/boy-premium-avatar.png', 
      icon: '/icons/star.png', 
      color: 'bg-white', 
      borderColor: 'border-gray-300'
    },
    { 
      id: 'girls-economy', 
      title: 'بنات اقتصادي', 
      avatar: '/icons/girl-economy-avatar.png', 
      icon: '/icons/eco.png', 
      color: 'bg-white', 
      borderColor: 'border-gray-300'
    },
    { 
      id: 'girls-premium', 
      title: 'بنات ممتاز', 
      avatar: '/icons/girl-premium-avatar.png', 
      icon: '/icons/star.png', 
      color: 'bg-white', 
      borderColor: 'border-gray-300'
    },
    { 
      id: 'mixed_sets', 
      title: 'أطقم أولاد وبنات', 
      avatar: '/icons/mixed-sets-avatar.png',
      icon: '/icons/star.png', 
      color: 'bg-white', 
      borderColor: 'border-gray-300'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) onCategorySelect(categoryId);
    console.log('📌 categoryId:', categoryId);
  };

  return (
    <div className="bg-white py-4 px-2">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        {categories.map((category) => {
          const priceRange = getPriceRange(category.id);
          return (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
              className="flex-shrink-0"
            >
              <div className="flex flex-col items-center">
                {/* أفاتار الفئة */}
                <div className="relative mb-3">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-3 bg-gray-300/30 rounded-full blur-md" />
                  <img 
                    src={category.avatar} 
                    alt={category.title} 
                    className="w-16 h-16 object-contain relative z-10" 
                  />
                </div>

                {/* المنصة البيضاء */}
                <div
                  className={`flex flex-col items-center px-4 py-3 min-w-[120px] rounded-2xl border-2 transition-all duration-300
                    ${category.color} 
                    ${selectedCategory === category.id ? 'border-[#FF8A5C] shadow-lg scale-105' : 'border-transparent hover:border-gray-300'}
                  `}
                >
                  <span className="text-sm font-bold text-gray-800 mb-1">
                    {category.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <img src={category.icon} alt={category.title} className="w-4 h-4" />
                    <span className="text-xs font-medium text-gray-600">{priceRange}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* مؤشر السكرول السفلي */}
      <div className="flex justify-center gap-1 mt-2">
        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-5 h-full bg-[#FF8A5C] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CategoriesScroll;