// pages/favorites.jsx
import React from 'react';
import { useRouter } from 'next/router';
import useFavoritesStore from '../utils/favoritesStore';
import useCartStore from '../utils/cartStore';
import ProductCard from '../components/Products/ProductCard';

export default function FavoritesPage() {
  const router = useRouter();
  const { items, toggleFavorite } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product) => addToCart(product);
  const handleRemove = (product) => toggleFavorite(product);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white p-4">
        <div className="text-center py-12">
          <span className="text-8xl mb-4 block opacity-30">❤️</span>
          <p className="text-gray-500 text-lg mb-4">لا توجد منتجات في المفضلة</p>
          <button onClick={() => router.push('/')} className="bg-[#FF8A5C] text-white px-6 py-3 rounded-none">استكشاف المنتجات</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white p-4 pb-28">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="p-2">
          <img src="/icons/arrow-left.png" className="w-5 h-5" alt="رجوع" />
        </button>
        <h1 className="text-xl font-bold">المفضلة</h1>
        <div className="w-8" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} viewMode={2} onAddToCart={handleAddToCart} />
            <button
              onClick={() => handleRemove(product)}
              className="absolute top-2 right-2 p-1" // بدون خلفية أو استدارة
            >
              <img src="/icons/close.png" className="w-4 h-4" alt="حذف" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}