// pages/index.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TopNewsBar from '../components/Layout/TopNewsBar';
import MainHeader from '../components/Layout/MainHeader';
import CategoriesScroll from '../components/Layout/CategoriesScroll';
import BottomBar from '../components/Layout/BottomBar';
import ProductsGrid from '../components/Products/ProductsGrid';
import ProductModal from '../components/Products/ProductModal';
import AIChatModal from '../components/AI/AIChatModal';
import PhoneRegisterPopup from "../components/PhoneRegisterPopup";
import SocialStrip from '../components/Layout/SocialStrip';
import { ToastContainer, toastManager } from '../components/UI/Toast';
import { getAllProducts } from '../utils/productsParser';
import useCartStore from '../utils/cartStore';
import useFavoritesStore from '../utils/favoritesStore';
import { useSound } from '../hooks';

export default function Home() {
  const router = useRouter();
  const { playAddSound } = useSound();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [mamatiProducts, setMamatiProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    category: 'الكل',
    priceRange: 'الكل',
    size: 'الكل'
  });

  const { getItemCount } = useCartStore();
  const { items: favoriteItems } = useFavoritesStore();

  // Handle category from query param (banner click)
  useEffect(() => {
    const { category } = router.query;
    if (category === 'mixed_sets') {
      setSelectedCategory('mixed_sets');
    }
  }, [router.query]);

  // Handle search from query param (drawer menu search)
  useEffect(() => {
    const { search } = router.query;
    if (search && typeof search === 'string') {
      handleSearch(search);
    }
  }, [router.query]);

  // Load all products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const kidsProducts = allProducts.filter(p =>
          ['boy', 'girls', 'sets'].includes(p.faction)
        );
        setProducts(kidsProducts);
        setFilteredProducts(kidsProducts);
        const market = allProducts.filter(p => p.isMamatiMarket);
        setMamatiProducts(market);
      } catch (error) {
        toastManager.error('حدث خطأ في تحميل المنتجات');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter by selectedCategory (from CategoriesScroll) and also by query parameters (age & category)
  useEffect(() => {
    let filtered = [...products];

    // First, filter by selectedCategory if any (from categories scroll)
    if (selectedCategory !== null && selectedCategory !== 'mamati-market') {
      switch (selectedCategory) {
        case 'boys-economy':
          filtered = filtered.filter(p => p.faction === 'boy' && p.price >= 25 && p.price <= 40);
          break;
        case 'boys-premium':
          filtered = filtered.filter(p => p.faction === 'boy' && p.price >= 45 && p.price <= 60);
          break;
        case 'mixed_sets':
          filtered = filtered.filter(p => p.faction === 'sets');
          break;
        case 'girls-economy':
          filtered = filtered.filter(p => p.faction === 'girls' && p.price >= 25 && p.price <= 40);
          break;
        case 'girls-premium':
          filtered = filtered.filter(p => p.faction === 'girls' && p.price >= 45 && p.price <= 60);
          break;
        default:
          filtered = [...products];
      }
    } else if (selectedCategory === 'mamati-market') {
      filtered = mamatiProducts;
    }

    // Apply filter from URL query parameters (age and category)
    const { age: ageParam, category: filterCategoryParam, search } = router.query;
    if (filterCategoryParam) {
      if (filterCategoryParam === 'أولاد') {
        filtered = filtered.filter(p => p.faction === 'boy');
      } else if (filterCategoryParam === 'بنات') {
        filtered = filtered.filter(p => p.faction === 'girls');
      } else if (filterCategoryParam === 'أطقم') {
        filtered = filtered.filter(p => p.faction === 'sets');
      }
    }
    if (ageParam) {
      filtered = filtered.filter(p => {
        const productAge = parseFloat(p.size); // support decimals (0.5, 1.5)
        if (isNaN(productAge)) return false;
        switch (ageParam) {
          case '6-9 أشهر':
            return productAge >= 0.5 && productAge <= 0.75;
          case '1-1.5 سنة':
            return productAge >= 1 && productAge <= 1.5;
          case '2-3 سنة':
            return productAge >= 2 && productAge <= 3;
          case '3-4 سنة':
            return productAge >= 3 && productAge <= 4;
          case '4-5 سنة':
            return productAge >= 4 && productAge <= 5;
          case '5-6 سنة':
            return productAge >= 5 && productAge <= 6;
          case '6-7 سنة':
            return productAge >= 6 && productAge <= 7;
          case '7-8 سنة':
            return productAge >= 7 && productAge <= 8;
          case '8-9 سنة':
            return productAge >= 8 && productAge <= 9;
          case '10-12 سنة':
            return productAge >= 10 && productAge <= 12;
          default:
            return true;
        }
      });
    }
    // Apply search filter if present (overrides other filters? we keep it last)
    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(p => {
        let categoryName = '';
        if (p.faction === 'boy') categoryName = 'أولاد';
        else if (p.faction === 'girls') categoryName = 'بنات';
        else if (p.faction === 'sets') categoryName = 'أطقم';
        else categoryName = p.faction;
        return categoryName.includes(searchLower);
      });
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, products, mamatiProducts, router.query]);

  const getCategoryDisplay = (categoryId) => {
    if (categoryId === null) return { text: 'جميع المنتجات', icon: '/icons/star.png' };
    const categoryMap = {
      'boys-economy': { text: 'أولاد اقتصادي', icon: '/icons/eco.png' },
      'boys-premium': { text: 'أولاد ممتاز', icon: '/icons/star.png' },
      'girls-economy': { text: 'بنات اقتصادي', icon: '/icons/eco.png' },
      'girls-premium': { text: 'بنات ممتاز', icon: '/icons/star.png' },
      'mixed_sets': { text: 'أطقم أولاد وبنات', icon: '/icons/star.png' },
      'mamati-market': { text: 'مامتي ماركيت', icon: '/icons/mamati.png' }
    };
    return categoryMap[categoryId] || { text: 'منتجات', icon: '/icons/star.png' };
  };

  // Search only by category name (أولاد، بنات، أطقم)
  const handleSearch = (query) => {
    if (!query || query.trim() === '') {
      const params = new URLSearchParams(router.query);
      params.delete('search');
      router.push({ pathname: '/', query: params.toString() });
      return;
    }
    const searchLower = query.toLowerCase().trim();
    // We'll set query param and let useEffect handle filtering
    router.push(`/?search=${encodeURIComponent(searchLower)}`);
  };

  const handleFilterToggle = () => setShowFilter(!showFilter);
  const handleApplyFilter = () => {
    let filtered = products;
    if (filterOptions.category !== 'الكل') {
      filtered = filtered.filter(p =>
        (filterOptions.category === 'بنات' && p.faction === 'girls') ||
        (filterOptions.category === 'أولاد' && p.faction === 'boy') ||
        (filterOptions.category === 'أطقم' && p.faction === 'sets')
      );
    }
    if (filterOptions.priceRange !== 'الكل') {
      filtered = filtered.filter(p => {
        if (filterOptions.priceRange === '25-40') return p.price >= 25 && p.price <= 40;
        if (filterOptions.priceRange === '45-60') return p.price >= 45 && p.price <= 60;
        if (filterOptions.priceRange === '70-80') return p.price >= 70 && p.price <= 80;
        return true;
      });
    }
    if (filterOptions.size !== 'الكل') {
      filtered = filtered.filter(p => p.size === filterOptions.size);
    }
    setFilteredProducts(filtered);
    setShowFilter(false);
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
          <p className="text-gray-600">جاري تحميل مامتي...</p>
        </div>
      </div>
    );
  }

  const bannerSlides = [
    { image: '/banners/banner1.png', link: '/?category=mixed_sets', showButton: true },
    { image: '/banners/banner2.png', link: '/mamati-market', showButton: true },
    { image: '/banners/banner3.png', link: '/', showButton: false },
  ];

  const categoryDisplay = getCategoryDisplay(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white space-y-[2px]">
      <TopNewsBar />
      <MainHeader
        cartCount={getItemCount()}
        favoritesCount={favoriteItems.length}
        onSearch={handleSearch}
        onFilterToggle={handleFilterToggle}
      />

      <div className="px-0 pt-0 pb-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="rounded-2xl overflow-visible"
        >
          {bannerSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative">
                <img src={slide.image} alt={`banner ${idx+1}`} className="w-full h-48 object-cover rounded-2xl" />
                {slide.showButton && (
                  <button
                    onClick={() => router.push(slide.link)}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-orange-500 font-bold px-4 py-1.5 rounded-full shadow-md z-20 hover:bg-gray-100 transition text-sm"
                  >
                    تسوق الان
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <SocialStrip />

      <CategoriesScroll 
        onCategorySelect={(catId) => setSelectedCategory(catId)} 
        products={products} 
      />

      <div className="px-4 pt-2 pb-28">
        {/* Mamati Market card - shown only when no filter is active and no category selected from scroll */}
        {selectedCategory === null && !router.query.age && !router.query.category && !router.query.search && mamatiProducts.length > 0 && (
          <div className="mb-6 p-4 rounded-lg relative overflow-hidden" style={{ backgroundColor: '#F7F5F2' }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-4 left-4 text-4xl">👛</div>
              <div className="absolute bottom-4 right-4 text-4xl">👟</div>
              <div className="absolute top-1/2 left-1/3 text-3xl">👜</div>
              <div className="absolute bottom-1/3 right-1/4 text-3xl">👡</div>
              <div className="absolute top-10 right-10 text-3xl">🧢</div>
              <div className="absolute bottom-10 left-10 text-3xl">💼</div>
            </div>

            <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-3 relative z-10">
              <img src="/icons/mamati.png" alt="مامتي ماركيت" className="h-5 w-5" />
              مامتي ماركيت
            </h2>

            <ProductsGrid
              products={mamatiProducts.slice(0, 4)}
              categoryInfo={{ text: 'مامتي ماركيت', icon: '/icons/mamati.png' }}
              onProductPress={handleProductPress}
              hideViewMode={true}
              hideHeader={true}
            />

            <div className="flex justify-center mt-3 relative z-10">
              <button
                onClick={() => router.push('/mamati-market')}
                className="text-sm text-black bg-white border border-black rounded-none font-bold px-4 py-2 flex items-center gap-2 shadow-sm hover:bg-gray-100 transition"
              >
                المزيد من المنتجات
                <img src="/icons/more.png" className="w-4 h-4" alt="more" />
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-2xl">
            <span className="text-6xl mb-4 block opacity-30">👶</span>
            <p className="text-gray-500">لا توجد منتجات في هذه الفئة</p>
          </div>
        ) : (
          <ProductsGrid
            products={filteredProducts}
            categoryInfo={categoryDisplay}
            onProductPress={handleProductPress}
          />
        )}
      </div>

      <BottomBar
        cartCount={getItemCount()}
        onAIClick={() => setShowAIChat(true)}
        onInfoClick={() => router.push('/instructions')}
        onOffersClick={() => toastManager.info('عروض مامتي')}
        onWhatsAppClick={() => window.open('https://wa.me/212663319599', '_blank')}
        onSearch={handleSearch}
      />

      <PhoneRegisterPopup />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAIClick={() => setShowAIChat(true)}
      />

      <AIChatModal
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        products={products}
        mamatiProducts={mamatiProducts}
      />

      <ToastContainer />
    </div>
  );
}