// pages/filter.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MainHeader from '../components/Layout/MainHeader';
import BottomBar from '../components/Layout/BottomBar';
import useCartStore from '../utils/cartStore';
import useFavoritesStore from '../utils/favoritesStore';
import { ToastContainer } from '../components/UI/Toast';

export default function FilterPage() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');

  const { getItemCount } = useCartStore();
  const { items: favoriteItems } = useFavoritesStore();

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (gender) params.append('gender', gender);
    if (age) params.append('age', age);
    if (category) params.append('category', category);
    router.push(`/?${params.toString()}`);
  };

  const handleReset = () => {
    setGender('');
    setAge('');
    setCategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white">
      <MainHeader
        cartCount={getItemCount()}
        favoritesCount={favoriteItems.length}
        onSearch={() => {}}
        onFilterToggle={() => {}}
      />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#FF8A5C] mb-2">🔍 فلتر المنتجات</h1>
        <p className="text-center text-gray-500 mb-8">اختر الجنس والعمر والفئة لنتائج دقيقة</p>

        {/* الجنس */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">الجنس</label>
          <div className="flex gap-4">
            <button
              onClick={() => setGender('boy')}
              className={`flex-1 py-2 rounded-full border-2 transition ${
                gender === 'boy' ? 'bg-[#FF8A5C] border-[#FF8A5C] text-white' : 'border-gray-300 text-gray-700'
              }`}
            >
              👦 أولاد
            </button>
            <button
              onClick={() => setGender('girl')}
              className={`flex-1 py-2 rounded-full border-2 transition ${
                gender === 'girl' ? 'bg-[#FF8A5C] border-[#FF8A5C] text-white' : 'border-gray-300 text-gray-700'
              }`}
            >
              👧 بنات
            </button>
          </div>
        </div>

        {/* العمر */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">العمر (سنوات)</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A5C]"
          >
            <option value="">الكل</option>
            {[...Array(13).keys()].slice(1).map((a) => (
              <option key={a} value={a}>{a} سنوات</option>
            ))}
          </select>
        </div>

        {/* الفئة */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">الفئة</label>
          <div className="flex flex-wrap gap-3">
            {['أولاد', 'بنات', 'أطقم'].map((cat) => (
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

        {/* الأزرار */}
        <div className="flex gap-4">
          <button
            onClick={handleApplyFilter}
            className="flex-1 bg-[#FF8A5C] text-white py-3 rounded-xl font-bold hover:bg-[#E67A4F] transition"
          >
            تطبيق الفلتر
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
          >
            إعادة ضبط
          </button>
        </div>
      </div>

      <BottomBar
        cartCount={getItemCount()}
        onAIClick={() => router.push('/')}
        onInfoClick={() => router.push('/instructions')}  // لا يزال موجوداً لكن قد لا يستخدم
        onOffersClick={() => {}}
        onWhatsAppClick={() => window.open('https://wa.me/212663319599', '_blank')}
        onSearch={() => {}}
      />
      <ToastContainer />
    </div>
  );
}