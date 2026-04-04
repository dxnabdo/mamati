import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Button from '../../components/UI/Button';
import BottomBar from '../../components/Layout/BottomBar';
import { SmartMatchModal } from '../../components/AI/AIModals';
import useCartStore from '../../utils/cartStore';
import useFavoritesStore from '../../utils/favoritesStore';
import { playSound } from '../../utils/soundEffects';
import { showToast } from '../../utils/toastMessages';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageScale, setImageScale] = useState(1);
  const [showAIModal, setShowAIModal] = useState(false);

  const { addItem } = useCartStore();
  const { addItem: addToFavorites, isFavorite } = useFavoritesStore();
  const { getItemCount } = useCartStore();

  useEffect(() => {
    if (id) {
      fetch(`/api/products?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('خطأ في تحميل المنتج:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleZoom = () => {
    setImageScale(imageScale === 1 ? 2 : 1);
    playSound('click');
  };

  const handleAddToCart = () => {
    addItem(product);
    playSound('add');
    showToast('added_to_cart', 'success');
  };

  const handleAddToFavorites = () => {
    addToFavorites(product);
    playSound('favorite');
    showToast('favorite_saved', 'success');
  };

  const handleShare = () => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareText = `${product.faction === 'boy' ? 'ولد' : 
                       product.faction === 'girls' ? 'بنت' : 
                       product.faction === 'women' ? 'نساء' : 'أطقم'} - ${product.price} درهم`;
    
    if (navigator.share) {
      navigator.share({
        title: 'BAL-MA',
        text: shareText,
        url: productUrl,
      }).catch(() => fallbackCopy(productUrl));
    } else {
      fallbackCopy(productUrl);
    }
  };

  const fallbackCopy = (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        showToast('تم نسخ رابط المنتج', 'info');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('تم نسخ رابط المنتج', 'info');
      }
    } catch (error) {
      showToast('send_failed', 'error');
    }
  };

  // دالة الذكاء الاصطناعي
  const handleAIClick = () => {
    console.log('🤖 زر الذكاء الاصطناعي تم الضغط عليه في صفحة المنتج');
    playSound('click');
    setShowAIModal(true);
  };

  const getAgeText = () => {
    if (!product) return '';
    if (product.faction === 'boy' || product.faction === 'girls') {
      return `${product.size} سنوات`;
    }
    return '';
  };

  const getProductIcon = () => {
    if (!product) return '💰';
    if (product.type === 'premium' || product.price >= 90) return '⭐';
    if (product.type === 'sets' || product.faction === 'sets') return '✨';
    return '💰';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">جاري التحميل...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Button variant="primary" onClick={() => router.push('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* زر الرجوع */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="p-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <img src="/icons/arrow-left.png" alt="رجوع" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* صورة المنتج */}
      <div className="relative">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-[70vh] object-cover"
          style={{ scale: imageScale }}
          transition={{ type: 'spring' }}
        />
        
        {/* زر التكبير */}
        <button
          onClick={handleZoom}
          className="absolute top-4 right-4 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
        >
          <img src="/icons/eye.png" alt="تكبير" className="w-6 h-6" />
        </button>

        {/* أيقونة المنتج */}
        <div className="absolute top-20 left-4 text-4xl bg-black/30 p-3 rounded-full backdrop-blur-sm">
          {getProductIcon()}
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 bg-white rounded-t-3xl -mt-6 relative z-10 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {product.faction === 'boy' ? 'ولد' : 
             product.faction === 'girls' ? 'بنت' : 
             product.faction === 'women' ? 'نساء' : 'أطقم'} {getAgeText()}
          </h1>
          
          <div className="flex items-center justify-between">
            <span className="text-4xl text-[#FF4D8D] font-bold">
              {product.price} درهم
            </span>
            <span className="text-3xl bg-gray-100 p-3 rounded-full">
              {getProductIcon()}
            </span>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between text-sm text-gray-600">
              <span>السيريال:</span>
              <span className="font-bold">{product.serial}</span>
            </div>
          </div>
        </div>

        {/* الأزرار */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#FF4D8D] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#E63E7B] transition-colors"
          >
            <span>🛒</span>
            <span>أضف للسلة</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleAddToFavorites}
              className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isFavorite(product.id)
                  ? 'bg-[#FF4D8D] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <img src="/icons/heart.png" alt="مفضلة" className="w-5 h-5" />
              {isFavorite(product.id) ? 'في المفضلة' : 'أضف للمفضلة'}
            </button>

            <button
              onClick={handleShare}
              className="flex-1 py-3 bg-gray-100 rounded-lg font-medium flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <img src="/icons/share.png" alt="مشاركة" className="w-5 h-5" />
              مشاركة
            </button>
          </div>
        </div>
      </div>

      {/* الشريط السفلي */}
      <BottomBar 
        cartCount={getItemCount()}
        onAIClick={handleAIClick}
        onInfoClick={() => router.push('/instructions')}
        onLocationClick={() => window.open('https://maps.google.com/?q=Marrakech', '_blank')}
        onWhatsAppClick={() => window.open('https://wa.me/212600000000', '_blank')}
      />

      {/* مودال الذكاء الاصطناعي */}
      <SmartMatchModal 
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        product={product}
      />
    </div>
  );
}