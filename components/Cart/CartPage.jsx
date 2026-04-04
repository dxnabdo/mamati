import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useCartStore from '../../utils/cartStore';
import { playSound } from '../../utils/soundEffects';
import { showToast } from '../../utils/toastMessages';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, getTotalPrice, getItemCount } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveItem = (productId) => {
    removeItem(productId);
    playSound('remove');
    showToast('removed_from_cart', 'info');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    playSound('success');
    
    // إنشاء رسالة واتساب
    const message = createWhatsAppMessage(items, getTotalPrice());
    
    // فتح واتساب مع الرسالة
    window.open(`https://wa.me/212663319599?text=${message}`, '_blank');
    
    setIsCheckingOut(false);
    showToast('order_sent', 'success');
  };

  // وصف المنتج مع أيقونة الجنس وكلمة "سنوات"
  const getProductDescription = (item) => {
    const genderIcon = { 
      'boy': '👦', 
      'girls': '👧', 
      'sets': '🎁' 
    };
    const icon = genderIcon[item.faction] || '';
    const genderText = { 
      'boy': 'ولد', 
      'girls': 'بنت', 
      'sets': 'أطقم' 
    };
    const text = genderText[item.faction] || '';
    
    if (item.faction === 'boy' || item.faction === 'girls') {
      return `${icon} ${text} ${item.size} سنوات`;
    }
    return `${icon} ${text}`;
  };

  // الحصول على الحرف الأول من الفئة (للسيريال)
  const getFactionLetter = (faction) => {
    const map = {
      'boy': 'b',
      'girls': 'g',
      'sets': 's'
    };
    return map[faction] || '';
  };

  // إنشاء رسالة واتساب
  const createWhatsAppMessage = (items, totalPrice) => {
    let productsList = '';
    
    items.forEach((item, index) => {
      const description = getProductDescription(item);
      const letter = getFactionLetter(item.faction);
      const serialCode = `${letter}_${item.size}_${item.price}_${item.serial}`;
      const productUrl = `${window.location.origin}/product/${item.id}`;
      
      productsList += `${index + 1}. ${description} - ${item.price} درهم\n`;
      productsList += `   🔗 رابط المنتج: ${productUrl}\n`;
      productsList += `   🏷️ السيريال: ${serialCode}\n\n`;
    });

    return encodeURIComponent(
      `🛍️ *أريد طلب المنتجات التالية:*\n\n` +
      `${productsList}` +
      `💰 *المجموع الكلي:* ${totalPrice} درهم\n\n` +
      `✅ شكراً، في انتظار تأكيد الطلب`
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white flex items-center justify-center p-4">
        <div className="text-center">
          <span className="text-8xl mb-4 opacity-30">🛒</span>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">سلتك فارغة</h1>
          <button 
            onClick={() => router.push('/')} 
            className="bg-[#FF8A5C] text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:bg-[#E67A4F] transition-colors"
          >
            تصفح المنتجات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white pb-32">
      {/* الهيدر */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src="/icons/arrow-left.png" alt="رجوع" className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">سلة المشتريات</h1>
          <span className="bg-[#FF8A5C] text-white px-3 py-1 rounded-full text-sm">
            {getItemCount()} {getItemCount() === 1 ? 'منتج' : 'منتجات'}
          </span>
        </div>
      </div>

      {/* قائمة المنتجات */}
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex p-3">
              {/* صورة المنتج */}
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* تفاصيل المنتج */}
              <div className="flex-1 pr-3">
                <div className="flex justify-between items-start">
                  {/* العنوان في الوسط */}
                  <div className="flex-1 text-center">
                    <h3 className="font-bold text-base text-gray-800">
                      {getProductDescription(item)}
                    </h3>
                  </div>
                  
                  {/* زر الحذف مع كلمة "حذف" */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <span>✕</span>
                    <span>حذف</span>
                  </button>
                </div>

                {/* السعر - رقم على اليسار، "درهم" على اليمين */}
                <div className="flex justify-center items-center gap-1 mt-2">
                  <span className="text-lg font-bold text-[#2A7DE1]">{item.price}</span>
                  <span className="text-sm text-gray-500">درهم</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* الجزء السفلي الثابت */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          {/* المجموع الكلي - كلمة في اليسار، السعر في اليمين */}
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-2xl font-bold text-[#2A7DE1]">
              {getTotalPrice()} <span className="text-sm text-gray-500">درهم</span>
            </span>
            <span className="text-gray-600 font-medium">المجموع الكلي</span>
          </div>

          {/* زر اطلب الآن عبر واتساب */}
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md"
          >
            {isCheckingOut ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>جاري التجهيز...</span>
              </>
            ) : (
              <>
                <img src="/icons/whatsapp.png" alt="واتساب" className="w-6 h-6" />
                <span>اطلب الآن عبر واتساب</span>
              </>
            )}
          </button>

          {/* رابط العودة للتسوق */}
          <div className="text-center mt-3">
            <button
              onClick={() => router.push('/')}
              className="text-[#2A7DE1] hover:underline text-sm font-medium"
            >
              ← العودة للتسوق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}