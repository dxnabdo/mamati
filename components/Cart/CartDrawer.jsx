import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from '../UI/Icon';
import Button from '../UI/Button';
import { useCartStore } from '../../utils/cartStore';
import { playSound } from '../../utils/soundEffects';
import { showToast } from '../../utils/toastMessages';
import { shareCartOnWhatsApp } from '../../utils/whatsappMessage';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, getTotalPrice, getItemCount } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // حذف منتج من السلة
  const handleRemoveItem = (productId, e) => {
    e.stopPropagation();
    removeItem(productId);
    playSound('remove');
    showToast('removed_from_cart', 'info');
  };

  // متابعة الطلب
  const handleCheckout = () => {
    setIsCheckingOut(true);
    playSound('success');
    
    // محاكاة معالجة الطلب
    setTimeout(() => {
      shareCartOnWhatsApp(items, getTotalPrice());
      setIsCheckingOut(false);
      onClose();
    }, 1000);
  };

  // الحصول على وصف المنتج
  const getProductDescription = (item) => {
    const genderMap = {
      'boy': '👦 ولد',
      'girls': '👧 بنت',
      'women': '👩 نساء',
      'sets': '👘 طقم'
    };
    
    const gender = genderMap[item.faction] || '';
    const size = item.size;
    const price = item.price;
    
    return `${gender} - مقاس ${size} - ${price} درهم`;
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
            className="fixed inset-0 bg-black/50 z-[1000]"
            onClick={onClose}
          />

          {/* Drawer من اليمين */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-[1001] shadow-2xl flex flex-col"
          >
            {/* رأس Drawer */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Icon name="arrow-left" size="sm" />
                </button>
                <h2 className="text-xl font-bold">سلة المشتريات</h2>
              </div>
              <span className="bg-[#FF4D8D] text-white px-3 py-1 rounded-full text-sm">
                {getItemCount()} {getItemCount() === 1 ? 'منتج' : 'منتجات'}
              </span>
            </div>

            {/* محتوى السلة */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-8xl mb-4 opacity-30">🛒</span>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">سلتك فارغة</h3>
                  <p className="text-gray-500 mb-4">أضف بعض المنتجات لتبدأ</p>
                  <Button variant="primary" onClick={onClose}>
                    تسوق الآن
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      {/* صورة المنتج */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* تفاصيل المنتج */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-base">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {getProductDescription(item)}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              سيريال: {item.serial}
                            </p>
                          </div>
                          
                          {/* زر الحذف */}
                          <button
                            onClick={(e) => handleRemoveItem(item.id, e)}
                            className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Icon name="close" size="xs" />
                          </button>
                        </div>

                        {/* السعر */}
                        <div className="mt-2">
                          <span className="text-lg font-bold text-[#FF4D8D]">
                            {item.price} درهم
                          </span>
                        </div>

                        {/* Badge الفئة */}
                        <div className="mt-1">
                          <span className={`
                            inline-block text-xs px-2 py-0.5 rounded-full
                            ${item.type === 'premium' ? 'bg-pink-100 text-pink-700' : 
                              item.type === 'economy' ? 'bg-green-100 text-green-700' : 
                              'bg-purple-100 text-purple-700'}
                          `}>
                            {item.type === 'premium' ? '⭐ ممتاز' : 
                             item.type === 'economy' ? '💰 اقتصادي' : '✨ أطقم'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer السلة */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="border-t border-gray-200 p-4 bg-white"
              >
                {/* المجموع الكلي */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">المجموع الكلي</span>
                  <span className="text-2xl font-bold text-[#FF4D8D]">
                    {getTotalPrice()} درهم
                  </span>
                </div>

                {/* أزرار الإجراء */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleCheckout}
                    loading={isCheckingOut}
                  >
                    {isCheckingOut ? 'جاري التجهيز...' : 'إتمام الطلب'}
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={onClose}
                  >
                    متابعة التسوق
                  </Button>
                </div>

                {/* معلومات إضافية */}
                <p className="text-xs text-gray-400 text-center mt-4">
                  🚚 توصيل مجاني للطلبات فوق 150 درهم
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;