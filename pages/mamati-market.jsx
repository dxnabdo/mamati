// pages/mamati-market.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainHeader from '../components/Layout/MainHeader';
import BottomBar from '../components/Layout/BottomBar';
import ProductsGrid from '../components/Products/ProductsGrid';
import ProductModal from '../components/Products/ProductModal';
import { ToastContainer, toastManager } from '../components/UI/Toast';
import { getAllProducts } from '../utils/productsParser';
import useCartStore from '../utils/cartStore';
import useFavoritesStore from '../utils/favoritesStore';

export default function MamatiMarket() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getItemCount } = useCartStore();
  const { items: favoriteItems } = useFavoritesStore();

  const typeMap = {
    bag: 'حقيبة',
    tshirt: 'تي شيرت',
    pants: 'سروال',
    shoes: 'حذاء',
    dress: 'فستان',
    jacket: 'جاكيت',
    accessory: 'إكسسوار'
  };

  useEffect(() => {
    const loadMarketProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const marketOnly = allProducts.filter(p => p.isMamatiMarket);
        const withSearch = marketOnly.map(p => ({
          ...p,
          searchText: `${typeMap[p.type] || p.type} ${p.size || ''} ${p.price}`.toLowerCase()
        }));
        setProducts(withSearch);
        setFilteredProducts(withSearch);
      } catch (error) {
        toastManager.error('حدث خطأ في تحميل المنتجات');
      } finally {
        setLoading(false);
      }
    };
    loadMarketProducts();
  }, []);

  const handleSearch = (query) => {
    if (!query || query.trim() === '') {
      setFilteredProducts(products);
      return;
    }
    const lowerQuery = query.toLowerCase().trim();
    const filtered = products.filter(p =>
      p.searchText.includes(lowerQuery) ||
      p.type?.toLowerCase().includes(lowerQuery) ||
      (typeMap[p.type] && typeMap[p.type].includes(lowerQuery))
    );
    setFilteredProducts(filtered);
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9F5] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A5C] mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل مامتي ماركيت...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white pb-28">
      <MainHeader
        cartCount={getItemCount()}
        favoritesCount={favoriteItems.length}
        onSearch={handleSearch}
        onFilterToggle={() => {}}
        searchPlaceholder="...ابحث عن حقيبة أو ماركة"
      />

      {/* تم حذف عنوان h1 بالكامل */}

      <div className="px-4 pt-4 pb-28">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-2xl">
            <span className="text-6xl mb-4 block opacity-30">🛍️</span>
            <p className="text-gray-500">لا توجد منتجات تطابق بحثك</p>
          </div>
        ) : (
          <ProductsGrid
            products={filteredProducts}
            categoryInfo={{ text: 'مامتي ماركيت', icon: '/icons/mamati.png' }}
            onProductPress={handleProductPress}
          />
        )}
      </div>

      <BottomBar
        cartCount={getItemCount()}
        onAIClick={() => {}}
        onInfoClick={() => router.push('/instructions')}
        onOffersClick={() => toastManager.info('عروض مامتي')}
        onWhatsAppClick={() => window.open('https://wa.me/212663319599', '_blank')}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAIClick={() => {}}
      />

      <ToastContainer />
    </div>
  );
}