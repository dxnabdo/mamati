// components/UI/DrawerMenu.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DrawerMenu = ({ isOpen, onClose, onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
    // إذا كان المستخدم يريد التنقل إلى الصفحة الرئيسية مع نتيجة البحث، يمكن إضافة توجيه
    if (query.trim() === '') {
      router.push('/');
    } else {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClose = () => {
    setSearchQuery('');
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
            onClick={handleClose}
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
              <button onClick={handleClose} className="text-2xl">✕</button>
            </div>

            {/* حقل البحث داخل القائمة */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A5C]"
              />
            </div>

            <nav className="flex flex-col gap-3">
              <Link href="/" onClick={handleClose} className="hover:text-[#FF8A5C]">الرئيسية</Link>
              <Link href="/favorites" onClick={handleClose} className="hover:text-[#FF8A5C]">المفضلة</Link>
              <Link href="/cart" onClick={handleClose} className="hover:text-[#FF8A5C]">السلة</Link>
              <Link href="/mamati-market" onClick={handleClose} className="hover:text-[#FF8A5C]">مامتي ماركيت</Link>
              <Link href="/instructions" onClick={handleClose} className="hover:text-[#FF8A5C]">الإرشادات</Link>
              <Link href="/delivery" onClick={handleClose} className="hover:text-[#FF8A5C]">سياسة التوصيل</Link>
              <Link href="/exchange" onClick={handleClose} className="hover:text-[#FF8A5C]">الاستبدال</Link>
              <Link href="/contact" onClick={handleClose} className="hover:text-[#FF8A5C]">تواصل معنا</Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;