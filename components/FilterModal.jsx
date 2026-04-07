// components/FilterModal.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const FilterModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');

  const ageOptions = [
    '6 أشهر', '9 أشهر',
    '1 سنة', '1.5 سنة',
    '2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات', '10-12 سنوات'
  ];

  const handleApply = () => {
    const params = new URLSearchParams();
    if (age) params.append('age', age);
    if (category) params.append('category', category);
    router.push(`/?${params.toString()}`);
    onClose();
  };

  const handleReset = () => {
    setAge('');
    setCategory('');
    router.push('/'); // إزالة الفلتر
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-center text-[#FF8A5C] mb-4">فرز المنتجات</h2>

          {/* العمر */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">العمر</label>
            <div className="grid grid-cols-2 gap-3">
              {ageOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAge(opt)}
                  className={`py-2 rounded-full border-2 transition ${
                    age === opt ? 'bg-[#FF8A5C] border-[#FF8A5C] text-white' : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* الفئة */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">الفئة</label>
            <div className="flex flex-wrap gap-3">
              {['أطقم', 'أولاد', 'بنات'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full border-2 transition ${
                    category === cat ? 'bg-[#FF8A5C] border-[#FF8A5C] text-white' : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApply}
              className="flex-1 bg-[#FF8A5C] text-white py-2 rounded-xl font-bold hover:bg-[#E67A4F] transition"
            >
              تطبيق
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-300 transition"
            >
              إعادة ضبط
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterModal;