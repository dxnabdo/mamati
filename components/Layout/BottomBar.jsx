// components/Layout/BottomBar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DrawerMenu from '../UI/DrawerMenu';

const BottomBar = ({ 
  cartCount = 0, 
  onAIClick, 
  onInfoClick, 
  onOffersClick, 
  onWhatsAppClick,
  onSearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-[#FF8A5C]/20 py-2 px-4 z-50 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {/* أيقونة القائمة - تفتح DrawerMenu */}
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={handleMenuClick} 
            className="flex flex-col items-center"
          >
            <img src="/icons/menu.png" alt="القائمة" className="w-6 h-6" />
            <span className="text-xs mt-1 text-[#FF8A5C] font-medium">القائمة</span>
          </motion.button>

          {/* أيقونة الذكاء الاصطناعي - تفتح مودال المحادثة */}
          <motion.button whileTap={{ scale: 0.95 }} onClick={onAIClick} className="flex flex-col items-center">
            <img src="/icons/robot.png" alt="AI" className="w-6 h-6" />
            <span className="text-xs mt-1 text-gray-600">AI</span>
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

          {/* أيقونة الإرشادات */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={onInfoClick} className="flex flex-col items-center">
            <img src="/icons/info.png" alt="إرشادات" className="w-6 h-6" />
            <span className="text-xs mt-1 text-gray-600">إرشادات</span>
          </motion.button>

          {/* أيقونة واتساب */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={onWhatsAppClick} className="flex flex-col items-center">
            <img src="/icons/whatsapp.png" alt="واتساب" className="w-6 h-6" />
            <span className="text-xs mt-1 text-green-600 font-medium">واتساب</span>
          </motion.button>
        </div>
      </div>

      {/* القائمة الجانبية */}
      <DrawerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onSearch={onSearch}
      />
    </>
  );
};

export default BottomBar;