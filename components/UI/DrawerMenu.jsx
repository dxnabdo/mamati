import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCartStore from '../../utils/cartStore';
import useFavoritesStore from '../../utils/favoritesStore';
import Button from './Button';

const DrawerMenu = ({ isOpen, onClose, onSearch }) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { getItemCount } = useCartStore();
  const { items: favorites } = useFavoritesStore();

  // التحقق من حالة تسجيل الدخول عند فتح القائمة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userToken');
      setIsLoggedIn(!!token);
      setUserName(localStorage.getItem('userName') || '');
      setUserEmail(localStorage.getItem('userEmail') || '');
    }
  }, [isOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      onClose();
    }
  };

  // ✅ دالة تسجيل خروج فعالة
  const handleLogout = () => {
    console.log('🚪 تسجيل خروج');
    
    // مسح جميع بيانات الجلسة
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');
    
    // تحديث حالة تسجيل الدخول
    setIsLoggedIn(false);
    
    // إغلاق القائمة
    onClose();
    
    // التوجيه إلى الصفحة الرئيسية
    router.push('/');
    
    // إعادة تحميل الصفحة لضمان تحديث جميع المكونات
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const menuItems = [
    { id: 'home', path: '/', label: 'الرئيسية', icon: 'home' },
    { id: 'favorites', path: '/favorites', label: 'المفضلة', icon: 'heart', badge: favorites.length },
    { id: 'cart', path: '/cart', label: 'السلة', icon: 'cart-main', icon: 'cart-main' },
    { id: 'instructions', path: '/instructions', label: 'الإرشادات', icon: 'info' },
    { id: 'delivery', path: '/delivery', label: 'سياسة التوصيل', icon: 'truck' },
    { id: 'exchange', path: '/exchange', label: 'الاستبدال', icon: 'exchange' },
    { id: 'faq', path: '/faq', label: 'الأسئلة الشائعة', icon: 'question' },
    { id: 'contact', path: '/contact', label: 'تواصل معنا', icon: 'contact' },
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-2xl overflow-y-auto"
          >
            {/* رأس القائمة */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">القائمة</h2>
              <button 
                onClick={onClose} 
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <img src="/icons/close.png" alt="إغلاق" className="w-5 h-5" />
              </button>
            </div>

            {/* شريط البحث داخل القائمة */}
            <div className="p-4 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8A5C]"
                  dir="rtl"
                />
                <button type="submit" className="absolute left-3 top-3.5">
                  <img src="/icons/search.png" alt="بحث" className="w-5 h-5 opacity-50" />
                </button>
              </form>
            </div>

            {/* معلومات المستخدم - تظهر فقط إذا كان مسجلاً */}
            {isLoggedIn && (
              <div className="p-4 bg-gradient-to-r from-[#FF8A5C] to-[#FFD93D] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <p className="font-bold">{userName || 'مستخدم'}</p>
                    <p className="text-xs opacity-90">{userEmail || ''}</p>
                  </div>
                </div>
              </div>
            )}

            {/* روابط القائمة الرئيسية */}
            <div className="p-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleItemClick(item.path)}
                  className={`flex items-center justify-between p-3 mb-1 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeItem === item.path ? 'bg-[#FF8A5C] text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={`/icons/${item.icon}.png`} alt={item.label} className="w-6 h-6" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      activeItem === item.path ? 'bg-white text-[#FF8A5C]' : 'bg-[#FF8A5C] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* أزرار الحساب - تختلف حسب حالة تسجيل الدخول */}
            <div className="p-4 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  {/* رابط حسابي */}
                  <div
                    onClick={() => handleItemClick('/profile')}
                    className="flex items-center gap-4 p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <img src="/icons/user.png" alt="حسابي" className="w-6 h-6" />
                    <span className="font-medium">حسابي</span>
                  </div>
                  
                  {/* زر تسجيل الخروج */}
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors mt-2"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  {/* زر تسجيل الدخول */}
                  <div
                    onClick={() => handleItemClick('/login')}
                    className="flex items-center gap-4 p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <img src="/icons/login.png" alt="تسجيل الدخول" className="w-6 h-6" />
                    <span className="font-medium">تسجيل الدخول</span>
                  </div>
                  
                  {/* زر إنشاء حساب */}
                  <div
                    onClick={() => handleItemClick('/register')}
                    className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <img src="/icons/register.png" alt="إنشاء حساب" className="w-6 h-6" />
                    <span className="font-medium">إنشاء حساب جديد</span>
                  </div>
                </>
              )}
            </div>

            {/* قسم وسائل التواصل */}
            <div className="border-t border-gray-200 p-4 mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">تابعنا على</h3>
              <div className="flex justify-around">
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <img src="/icons/facebook.png" alt="فيسبوك" className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <img src="/icons/instagram.png" alt="انستغرام" className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <img src="/icons/tiktok.png" alt="تيك توك" className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 hover:bg-gray-100 rounded-full">
                  <img src="/icons/youtube.png" alt="يوتيوب" className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* معلومات المتجر */}
            <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
              <p>مامتي © 2024</p>
              <p className="mt-1">عالم طفلك الجميل</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;