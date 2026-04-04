import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from './Icon';

// القائمة الجانبية المنبثقة
const DrawerMenu = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.pathname);

  // عناصر القائمة
  const menuItems = [
    { id: 'home', path: '/', label: 'الرئيسية', icon: 'home' },
    { id: 'favorites', path: '/favorites', label: 'المفضلة', icon: 'heart' },
    { id: 'cart', path: '/cart', label: 'السلة', icon: 'cart-main' },
    { id: 'instructions', path: '/instructions', label: 'الإرشادات', icon: 'info' },
    { id: 'delivery', path: '/delivery', label: 'سياسة التوصيل', icon: 'truck' },
    { id: 'exchange', path: '/exchange', label: 'الاستبدال', icon: 'exchange' },
    { id: 'faq', path: '/faq', label: 'الأسئلة الشائعة', icon: 'question' },
    { id: 'contact', path: '/contact', label: 'تواصل معنا', icon: 'whatsapp' },
    { id: 'profile', path: '/profile', label: 'حسابي', icon: 'user' },
  ];

  const handleItemClick = (path) => {
    setActiveItem(path);
    router.push(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* خلفية داكنة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* القائمة الجانبية */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-2xl overflow-y-auto"
          >
            {/* رأس القائمة */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">القائمة</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <Icon name="close" size="md" />
              </button>
            </div>

            {/* عناصر القائمة */}
            <div className="p-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick(item.path)}
                  className={`
                    flex items-center gap-4 p-3 mb-1 rounded-lg cursor-pointer
                    transition-colors duration-200
                    ${activeItem === item.path 
                      ? 'bg-[#FF4D8D] text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <Icon 
                    name={item.icon} 
                    size="md"
                    alt={item.label}
                  />
                  <span className="font-medium">{item.label}</span>
                  
                  {/* أيقونة النجاح للمحدد */}
                  {activeItem === item.path && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mr-auto text-white"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* قسم وسائل التواصل */}
            <div className="border-t border-gray-200 p-4 mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">تابعنا على</h3>
              <div className="flex justify-around">
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <Icon name="facebook" size="lg" />
                </a>
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <Icon name="instagram" size="lg" />
                </a>
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <Icon name="tiktok" size="lg" />
                </a>
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <Icon name="youtube" size="lg" />
                </a>
              </div>
            </div>

            {/* معلومات المتجر */}
            <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
              <p>BAL-MA © 2024</p>
              <p className="mt-1">جميع الحقوق محفوظة</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// زر فتح القائمة
export const MenuButton = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${className}`}
    >
      <Icon name="menu" size="md" />
    </button>
  );
};

export default DrawerMenu;