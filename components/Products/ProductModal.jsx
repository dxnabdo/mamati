import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion } from 'framer-motion';
import useCartStore from '../../utils/cartStore';
import useFavoritesStore from '../../utils/favoritesStore';
import { useSound } from '../../hooks';

const ProductModal = ({ isOpen, onClose, product, onAIClick }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const { addToCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { playAddSound, playFavoriteSound } = useSound() || {};

  if (!isOpen || !product) return null;

  // استخراج معلومات المنتج من اسم الصورة
  const imageName = product.image.split("/").pop().split(".")[0];
  const parts = imageName.split("_");

  const productType = parts[0];
  let title = "";
  let displayAge = "";
  let price = product.price;

  if (productType === "sets") {
    const gender = parts[1] || "boy";
    const age = Number(parts[2]) || 2;
    price = Number(parts[3]) || price;
    const genderText = gender === "boy" ? "ولد" : "بنت";
    displayAge = `${age}-${age - 1} سنوات`;
    title = `طقم ${genderText} ${displayAge}`;
  } else {
    const gender = productType;
    const age = Number(parts[1]) || 0;
    price = Number(parts[2]) || price;
    const genderText = gender === "boy" ? "ولد" : "بنت";
    displayAge = `${age}-${age - 1} سنوات`;
    title = `${genderText} ${displayAge}`;
  }

  const oldPrice = price + 10;

  // أيقونة الجنس
  const getGenderIcon = () => {
    if (productType === "sets") return "🛍️";
    if (productType === "boy") return "👦";
    if (productType === "girls") return "👧";
    return "👕";
  };

  // نص التصنيف وأيقونته
  const getCategoryInfo = () => {
    if (productType === "sets") return { text: "أطقم", icon: "/icons/star.png" };
    if (price >= 25 && price <= 40) return { text: "اقتصادي", icon: "/icons/eco.png" };
    if (price >= 45 && price <= 60) return { text: "ممتاز", icon: "/icons/star.png" };
    return { text: "عادي", icon: "/icons/star.png" };
  };
  const category = getCategoryInfo();

  // دوال المشاركة
  const shareText = `تسوق الآن: ${title} بسعر ${price} درهم من متجر مامتي`;
  const shareUrl = `${window.location.origin}/product/${product.id}`;

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    setShowShareOptions(false);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShareOptions(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => alert('✅ تم نسخ الرابط'));
    setShowShareOptions(false);
  };

  const handleInstagram = () => copyLink();
  const handleTikTok = () => copyLink();

  const isFav = isFavorite(product.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-2"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-none w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-0.5 overflow-y-auto max-h-[85vh]">
          {/* زر الإغلاق */}
          <div className="flex justify-end mb-1">
            <button onClick={onClose} className="p-0.5">
              <img src="/icons/close.png" className="w-4 h-4" alt="إغلاق" />
            </button>
          </div>

          {/* حاوية الصورة مع خاصية الزوم وأزرار في الوسط */}
          <div className="relative mb-1.5 flex items-center justify-center min-h-[250px]">
            <div className="w-full max-h-[55vh] overflow-hidden">
              <TransformWrapper
                initialScale={1}
                minScale={0.8}
                maxScale={4}
                wheel={{ disabled: true }}
                doubleClick={{ disabled: true }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <TransformComponent>
                      <img
                        src={product.image}
                        className="w-full h-auto object-contain bg-gray-50 rounded-none"
                        alt="product"
                      />
                    </TransformComponent>

                    {/* أزرار التحكم بالزوم - في الوسط */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                        className="bg-black bg-opacity-60 text-white p-1.5 rounded-full shadow-lg text-xs hover:bg-opacity-80"
                      >
                        +
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                        className="bg-black bg-opacity-60 text-white p-1.5 rounded-full shadow-lg text-xs hover:bg-opacity-80"
                      >
                        -
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); resetTransform(); }}
                        className="bg-black bg-opacity-60 text-white p-1.5 rounded-full shadow-lg text-xs hover:bg-opacity-80"
                      >
                        🔄
                      </button>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>

          {/* العنوان مع أيقونة الجنس */}
          <div className="text-center mb-1.5">
            <h2 className="text-base font-bold flex items-center justify-center gap-2">
              <span className="text-lg">{getGenderIcon()}</span>
              <span>{title}</span>
            </h2>
          </div>

          {/* التصنيف على شكل زر */}
          <div className="flex items-center justify-center mb-1.5">
            <div className="bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <img src={category.icon} className="w-3 h-3" alt={category.text} />
              <span className="text-xs text-gray-700">{category.text}</span>
            </div>
          </div>

          {/* السعر */}
          <div className="flex items-center justify-center gap-2 mt-0.5 mb-1.5">
            <span className="text-blue-600 font-bold text-base">{price} درهم</span>
            <span className="text-gray-400 line-through text-xs">{oldPrice} درهم</span>
          </div>

          {/* زر إضافة للسلة */}
          <button
            onClick={() => {
              addToCart(product);
              playAddSound?.();
            }}
            className="w-full bg-black text-white py-1.5 rounded-none flex items-center justify-center gap-2 text-sm font-bold mb-1.5"
          >
            <img src="/icons/add.png" className="w-3 h-3" alt="add" />
            إضافة للسلة
          </button>

          {/* الأزرار الثلاثة: مفضلة، مشاركة، ذكاء اصطناعي */}
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            <button
              onClick={() => {
                toggleFavorite(product);
                playFavoriteSound?.();
              }}
              className={`flex flex-col items-center justify-center border py-1 rounded-none ${
                isFav ? 'bg-red-500 border-red-500 text-white' : 'border-black'
              }`}
            >
              <img
                src={isFav ? "/icons/heart2.png" : "/icons/heart.png"}
                className="w-3 h-3 mb-0.5"
                alt="favorite"
              />
              <span className="text-xs">مفضلة</span>
            </button>
            <button
              onClick={() => setShowShareOptions(true)}
              className="flex flex-col items-center justify-center border border-black py-1 rounded-none"
            >
              <img src="/icons/share.png" className="w-3 h-3 mb-0.5" alt="share" />
              <span className="text-xs">مشاركة</span>
            </button>
            <button
              onClick={() => onAIClick && onAIClick(product)}
              className="flex flex-col items-center justify-center border border-black py-1 rounded-none"
            >
              <span className="text-sm mb-0.5">🤖</span>
              <span className="text-xs">AI</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* نافذة المشاركة المنبثقة */}
      {showShareOptions && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
            onClick={() => setShowShareOptions(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white shadow-2xl border border-gray-200 p-4 z-[70] rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center font-bold text-gray-800 mb-2 text-base">شاركي المنتج</h3>
            <div className="mb-2 p-1.5 bg-gray-100 rounded-none flex items-center justify-between">
              <span className="text-xs text-gray-700 truncate flex-1 ml-2">{shareUrl}</span>
              <button onClick={copyLink} className="bg-blue-600 text-white px-2 py-0.5 rounded-none text-xs font-medium">
                نسخ
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1 mb-2">
              <button onClick={shareOnWhatsApp} className="flex flex-col items-center gap-0.5">
                <div className="bg-green-100 p-1 rounded-full">
                  <img src="/icons/whatsapp.png" className="w-3 h-3" alt="whatsapp" />
                </div>
                <span className="text-xs">واتساب</span>
              </button>
              <button onClick={shareOnFacebook} className="flex flex-col items-center gap-0.5">
                <div className="bg-blue-100 p-1 rounded-full">
                  <img src="/icons/facebook.png" className="w-3 h-3" alt="facebook" />
                </div>
                <span className="text-xs">فيسبوك</span>
              </button>
              <button onClick={handleInstagram} className="flex flex-col items-center gap-0.5">
                <div className="bg-pink-100 p-1 rounded-full">
                  <img src="/icons/instagram.png" className="w-3 h-3" alt="instagram" />
                </div>
                <span className="text-xs">انستغرام</span>
              </button>
              <button onClick={handleTikTok} className="flex flex-col items-center gap-0.5">
                <div className="bg-black p-1 rounded-full">
                  <img src="/icons/tiktok.png" className="w-3 h-3" alt="tiktok" />
                </div>
                <span className="text-xs">تيك توك</span>
              </button>
              <button onClick={copyLink} className="flex flex-col items-center gap-0.5">
                <div className="bg-gray-200 p-1 rounded-full">
                  <img src="/icons/copy.png" className="w-3 h-3" alt="copy" />
                </div>
                <span className="text-xs">نسخ</span>
              </button>
            </div>
            <button onClick={() => setShowShareOptions(false)} className="w-full bg-gray-100 py-1.5 rounded-none text-gray-800 font-medium text-sm">
              إغلاق
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProductModal;