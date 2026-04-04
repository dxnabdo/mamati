import React, { useState } from "react";
import useCartStore from "../../utils/cartStore";
import useFavoritesStore from "../../utils/favoritesStore";
import { useSound } from "../../hooks";

const ProductCard = ({ product, onPress, viewMode, onAddToCart, isHomePage = false }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  // المتاجر
  let addToCart = () => console.warn("⚠️ addToCart غير متوفرة");
  let toggleFavorite = () => console.warn("⚠️ toggleFavorite غير متوفرة");
  let isFavorite = () => false;

  try {
    const cartStore = useCartStore();
    addToCart = cartStore.addToCart || addToCart;
  } catch (e) {
    console.warn("❌ فشل تحميل useCartStore", e);
  }

  try {
    const favStore = useFavoritesStore();
    toggleFavorite = favStore.toggleFavorite || toggleFavorite;
    isFavorite = favStore.isFavorite || isFavorite;
  } catch (e) {
    console.warn("❌ فشل تحميل useFavoritesStore", e);
  }

  const { playAddSound, playFavoriteSound } = useSound() || {};

  // تحديد نوع المنتج وبناء العنوان والسعر
  let title = "";
  let genderIcon = "";
  let price = product.price || 0;
  let categoryIcon = "/icons/star.png";

  if (product.faction === "market") {
    // منتجات مامتي ماركيت
    const typeMap = {
      bag: "حقيبة",
      tshirt: "تي شيرت",
      pants: "سروال",
      shoes: "حذاء",
    };
    const typeArabic = typeMap[product.type] || product.type;
    title = product.size ? `${typeArabic} ${product.size}` : typeArabic;
    genderIcon = "🛍️";
    categoryIcon = "/icons/mamati.png";
  } else {
    // المنتجات العادية (أولاد، بنات، أطقم)
    const imageName = product.image.split("/").pop().split(".")[0];
    const parts = imageName.split("_");
    const productType = parts[0];

    if (productType === "sets") {
      const gender = parts[1] || "boy";
      const age = Number(parts[2]) || 2;
      price = Number(parts[3]) || price;
      const genderText = gender === "boy" ? "ولد" : "بنت";
      const displayAge = `${age}-${age - 1} سنوات`;
      title = `طقم ${genderText} ${displayAge}`;
      genderIcon = "🛍️";
    } else {
      const gender = productType;
      const age = Number(parts[1]) || 0;
      price = Number(parts[2]) || price;
      const genderText = gender === "boy" ? "ولد" : "بنت";
      const displayAge = `${age}-${age - 1} سنوات`;
      title = `${genderText} ${displayAge}`;
      genderIcon = gender === "boy" ? "👦" : "👧";
    }

    // تحديد أيقونة الفئة للمنتجات العادية
    if (productType === "sets") {
      categoryIcon = "/icons/star.png";
    } else if (price >= 25 && price <= 40) {
      categoryIcon = "/icons/eco.png";
    } else if (price >= 45 && price <= 60) {
      categoryIcon = "/icons/star.png";
    } else {
      categoryIcon = "/icons/star.png";
    }
  }

  const oldPrice = price + 10;

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

  // إضافة للسلة
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
    else if (addToCart) { addToCart(product); if (playAddSound) playAddSound(); }
    else alert("⚠️ خاصية الإضافة للسلة غير متوفرة حالياً");
  };

  // تبديل المفضلة
  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (toggleFavorite) { toggleFavorite(product); if (playFavoriteSound) playFavoriteSound(); }
    else alert("⚠️ خاصية المفضلة غير متوفرة حالياً");
  };

  const isFav = isFavorite ? isFavorite(product.id) : false;

  const handleCardClick = () => { if (onPress) onPress(product); };

  if (viewMode === 4) {
    return (
      <div className="overflow-hidden cursor-pointer rounded-none" onClick={handleCardClick}>
        <img src={product.image} className="w-full h-40 object-cover" alt="product" />
      </div>
    );
  }

  return (
    <div
      className="bg-white shadow-sm p-2 relative cursor-pointer rounded-none"
      onClick={handleCardClick}
    >
      {/* الصورة */}
      <div className="relative">
        <img
          src={product.image}
          className="w-full h-48 object-cover rounded-none"
          alt="product"
        />
        <div className="absolute top-2 left-2 bg-white p-2 rounded-full shadow">
          <img src={categoryIcon} className="w-4 h-4" alt="category" />
        </div>
      </div>

      {/* العنوان */}
      <div className="mt-2 text-right">
        <h3 className="font-semibold text-sm flex items-center justify-end gap-1">
          <span>{genderIcon}</span>
          <span>{title}</span>
        </h3>
      </div>

      {/* السعر */}
      <div className="flex items-center justify-end gap-2 mt-1">
        <span className="text-blue-600 font-bold text-lg">{price} درهم</span>
        {!isHomePage && (
          <span className="text-gray-400 line-through text-sm">{oldPrice} درهم</span>
        )}
      </div>

      {/* زر إضافة للسلة */}
      <button
        onClick={handleAddToCart}
        className="w-full mt-3 bg-black text-white py-2 rounded-none flex items-center justify-center gap-2"
      >
        <img src="/icons/add.png" className="w-4 h-4" alt="add" />
        إضافة للسلة
      </button>

      {/* أزرار المفضلة والمشاركة (تظهر فقط خارج الصفحة الرئيسية) */}
      {!isHomePage && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleFavoriteToggle}
            className={`flex-1 border py-1 rounded-none flex items-center justify-center ${isFav ? 'bg-red-500 border-red-500' : 'border-black'}`}
          >
            <img
              src={isFav ? "/icons/heart2.png" : "/icons/heart.png"}
              className="w-4 h-4"
              alt="favorite"
            />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowShareOptions(!showShareOptions); }}
            className="flex-1 border border-black py-1 rounded-none flex items-center justify-center relative"
          >
            <img src="/icons/share.png" className="w-4 h-4" alt="share" />
          </button>
        </div>
      )}

      {/* نافذة المشاركة المنبثقة (تظهر فقط إذا كان الزر ظاهراً) */}
      {!isHomePage && showShareOptions && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowShareOptions(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md bg-white shadow-2xl border border-gray-200 p-4 z-50 rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center font-bold text-gray-800 mb-3 text-lg">شاركي المنتج</h3>
            <div className="mb-2 p-3 bg-gray-100 rounded-none flex items-center justify-between">
              <span className="text-sm text-gray-700 truncate flex-1 ml-2">{shareUrl}</span>
              <button onClick={copyLink} className="bg-blue-600 text-white px-3 py-1 rounded-none text-xs font-medium">نسخ</button>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-3">
              <button onClick={shareOnWhatsApp} className="flex flex-col items-center gap-1">
                <div className="bg-green-100 p-3 rounded-full"><img src="/icons/whatsapp.png" className="w-7 h-7" alt="whatsapp" /></div>
                <span className="text-xs">واتساب</span>
              </button>
              <button onClick={shareOnFacebook} className="flex flex-col items-center gap-1">
                <div className="bg-blue-100 p-3 rounded-full"><img src="/icons/facebook.png" className="w-7 h-7" alt="facebook" /></div>
                <span className="text-xs">فيسبوك</span>
              </button>
              <button onClick={handleInstagram} className="flex flex-col items-center gap-1">
                <div className="bg-pink-100 p-3 rounded-full"><img src="/icons/instagram.png" className="w-7 h-7" alt="instagram" /></div>
                <span className="text-xs">انستغرام</span>
              </button>
              <button onClick={handleTikTok} className="flex flex-col items-center gap-1">
                <div className="bg-black p-3 rounded-full"><img src="/icons/tiktok.png" className="w-7 h-7" alt="tiktok" /></div>
                <span className="text-xs">تيك توك</span>
              </button>
              <button onClick={copyLink} className="flex flex-col items-center gap-1">
                <div className="bg-gray-200 p-3 rounded-full"><img src="/icons/copy.png" className="w-7 h-7" alt="copy" /></div>
                <span className="text-xs">نسخ</span>
              </button>
            </div>
            <button onClick={() => setShowShareOptions(false)} className="w-full bg-gray-100 py-2 rounded-none text-gray-800 font-medium text-base">إغلاق</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;