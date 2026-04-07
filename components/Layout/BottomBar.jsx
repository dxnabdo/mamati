// components/Layout/BottomBar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DrawerMenu from '../UI/DrawerMenu';
import FilterModal from '../FilterModal'; // المودال الجديد للفلتر

const BottomBar = ({ cartCount = 0, onAIClick, onInfoClick, onWhatsAppClick, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterApply = (filters) => {
    // يمكنك هنا تطبيق الفلتر على المنتجات، مثلاً بتخزينه في store أو تمريره للصفحة الرئيسية
    console.log('Filters applied:', filters);
    // مثلاً: window.location.href = `/?gender=${filters.gender}&age=${filters.age}&category=${filters.category}`;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-[#FF8A5C]/20 py-2 px-4 z-50 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {/* أيقونة القائمة */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center">
            <img src="/icons/menu.png" alt="القائمة" className="w-6 h-6" />
            <span className="text-xs mt-1 text-[#FF8A5C] font-medium">القائمة</span>
          </motion.button>

          {/* أيقونة الذكاء الاصطناعي - تم تغيير النص إلى "مساعد ذكي" */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={onAIClick} className="flex flex-col items-center">
            <img src="/icons/robot.png" alt="AI" className="w-6 h-6" />
            <span className="text-xs mt-1 text-gray-600">مساعد ذكي</span>
          </motion.button>

          {/* السلة بارزة في الوسط */}
          <Link href="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center cursor-pointer relative"
            >
              <div className="relative">
                <img
                  src={cartCount > 0 ? "/icons/bottom-bar/cart-active.png" : "/icons/bottom-bar/cart-default.png"}
                  alt="السلة"
                  className="w-7 h-7 relative z-10"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF8A5C] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white z-20">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 text-[#FF8A5C] font-bold">السلة</span>
            </motion.div>
          </Link>

          {/* زر الفلتر - يفتح مودال بدلاً من صفحة منفصلة */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsFilterOpen(true)} className="flex flex-col items-center">
            <img src="/icons/filter.png" alt="فلتر" className="w-6 h-6" />
            <span className="text-xs mt-1 text-gray-600">فلتر</span>
          </motion.button>

          {/* أيقونة واتساب - لون أسود موحد */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={onWhatsAppClick} className="flex flex-col items-center">
            <div className="bg-black p-2 rounded-full">
              <img src="/icons/whatsapp.png" alt="واتساب" className="w-5 h-5 invert" />
            </div>
            <span className="text-xs mt-1 text-black font-medium">واتساب</span>
          </motion.button>
        </div>
      </div>

      {/* القائمة الجانبية */}
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onSearch={onSearch} />

      {/* مودال الفلتر */}
      <FilterModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={handleFilterApply} />
    </>
  );
};

export default BottomBar;