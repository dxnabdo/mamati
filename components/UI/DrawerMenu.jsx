// components/UI/DrawerMenu.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DrawerMenu = ({ isOpen, onClose, onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      router.push('/');
    } else {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    onClose(); // إغلاق القائمة بعد البحث (اختياري)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">القائمة</h2>
              <button onClick={onClose} className="text-2xl">✕</button>
            </div>

            {/* 🔍 حقل البحث مع زر صغير (جديد) */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A5C]"
              />
              <button
                onClick={handleSearch}
                className="bg-[#FF8A5C] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#E67A4F] transition"
              >
                بحث
              </button>
            </div>

            {/* ✅ باقي محتوى القائمة (تسجيل الدخول، الحساب، الأيقونات، إلخ) */}
            {/* ضع هنا الروابط والأيقونات التي كانت موجودة سابقاً */}
            <nav className="flex flex-col gap-3">
              {/* مثال على الروابط الأساسية – أضف ما يناسب مشروعك */}
              <Link href="/" onClick={onClose} className="hover:text-[#FF8A5C]">الرئيسية</Link>
              <Link href="/favorites" onClick={onClose} className="hover:text-[#FF8A5C]">المفضلة</Link>
              <Link href="/cart" onClick={onClose} className="hover:text-[#FF8A5C]">السلة</Link>
              <Link href="/mamati-market" onClick={onClose} className="hover:text-[#FF8A5C]">مامتي ماركيت</Link>
              
              {/* روابط الحساب وتسجيل الدخول – تأكد من وجودها */}
              <Link href="/login" onClick={onClose} className="hover:text-[#FF8A5C]">تسجيل الدخول</Link>
              <Link href="/register" onClick={onClose} className="hover:text-[#FF8A5C]">إنشاء حساب</Link>
              <Link href="/profile" onClick={onClose} className="hover:text-[#FF8A5C]">حسابي</Link>
              
              {/* روابط إضافية */}
              <Link href="/instructions" onClick={onClose} className="hover:text-[#FF8A5C]">الإرشادات</Link>
              <Link href="/delivery" onClick={onClose} className="hover:text-[#FF8A5C]">سياسة التوصيل</Link>
              <Link href="/exchange" onClick={onClose} className="hover:text-[#FF8A5C]">الاستبدال</Link>
              <Link href="/contact" onClick={onClose} className="hover:text-[#FF8A5C]">تواصل معنا</Link>
            </nav>

            {/* أيقونات التواصل الاجتماعي (إذا كانت موجودة) */}
            <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200">
              <a href="https://www.instagram.com/mamaty__bal_marrakech" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.png" alt="انستغرام" className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1EGQ2yrJZs/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.png" alt="فيسبوك" className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@mamaty_bal_marrakech" target="_blank" rel="noopener noreferrer">
                <img src="/icons/tiktok.png" alt="تيك توك" className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <img src="/icons/youtube.png" alt="يوتيوب" className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;