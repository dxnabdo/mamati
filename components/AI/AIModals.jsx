import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../UI/Icon';
import Button from '../UI/Button';

// ============================================
// مودال الصفحة الرئيسية - Outfit Generator
// ============================================
export const OutfitGeneratorModal = ({ isOpen, onClose, products }) => {
  const [gender, setGender] = useState('girls');
  const [size, setSize] = useState('4');
  const [category, setCategory] = useState('premium');
  const [pieces, setPieces] = useState(3);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [step, setStep] = useState(1);

  const generateOutfit = () => {
    // محاكاة اختيار منتجات مناسبة
    const filtered = products.filter(p => 
      p.faction === gender && 
      p.size === size && 
      (category === 'all' || p.type === category)
    ).slice(0, pieces);
    
    setSelectedProducts(filtered);
    setStep(2);
  };

  const addAllToCart = () => {
    console.log('إضافة الكل للسلة:', selectedProducts);
    // هنا كود الإضافة للسلة
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
            className="fixed inset-0 bg-black/60 z-[1000]"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[1001] p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#FF4FA3]">✨ إنشاء طقم</h2>
              <button onClick={onClose} className="text-2xl w-8 h-8 flex items-center justify-center">✕</button>
            </div>

            {step === 1 ? (
              /* الخطوة 1: اختيارات */
              <div className="space-y-6">
                {/* الجنس */}
                <div>
                  <label className="block font-bold mb-3">الجنس</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGender('girls')}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${
                        gender === 'girls' 
                          ? 'bg-[#FF4FA3] text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      👧 بنات
                    </button>
                    <button
                      onClick={() => setGender('boys')}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${
                        gender === 'boys' 
                          ? 'bg-[#FF4FA3] text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      👦 أولاد
                    </button>
                  </div>
                </div>

                {/* المقاس */}
                <div>
                  <label className="block font-bold mb-3">المقاس</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-3 rounded-lg font-bold transition-all ${
                          size === s 
                            ? 'bg-[#FF4FA3] text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* الفئة */}
                <div>
                  <label className="block font-bold mb-3">الفئة</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCategory('premium')}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${
                        category === 'premium' 
                          ? 'bg-[#FF4FA3] text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      ⭐ ممتاز
                    </button>
                    <button
                      onClick={() => setCategory('economy')}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${
                        category === 'economy' 
                          ? 'bg-[#FF4FA3] text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      💰 اقتصادي
                    </button>
                  </div>
                </div>

                {/* عدد القطع */}
                <div>
                  <label className="block font-bold mb-3">عدد القطع</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[2, 3, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => setPieces(num)}
                        className={`py-4 rounded-xl font-bold text-lg transition-all ${
                          pieces === num 
                            ? 'bg-[#FF4FA3] text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {num} قطع
                      </button>
                    ))}
                  </div>
                </div>

                {/* زر إنشاء الطقم */}
                <button
                  onClick={generateOutfit}
                  className="w-full bg-[#FF4FA3] text-white py-5 rounded-xl font-bold text-lg shadow-lg mt-4"
                >
                  ✨ إنشاء طقم
                </button>
              </div>
            ) : (
              /* الخطوة 2: عرض الطقم */
              <div>
                <h3 className="font-bold text-lg mb-4">الطقم المقترح:</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {selectedProducts.map((p, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-xl">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-2" />
                      <p className="font-bold text-[#FF4FA3]">{p.price} درهم</p>
                      <p className="text-xs text-gray-500">{p.name}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={addAllToCart}
                    className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold"
                  >
                    🛒 أضف الكل
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// مودال صفحة المنتج - Smart Matching
// ============================================
export const SmartMatchModal = ({ isOpen, onClose, product }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const suggestions = [
    { id: 1, name: 'بنطلون مناسب', price: 45 },
    { id: 2, name: 'جاكيت', price: 60 },
  ];

  const addAllToCart = () => {
    console.log('إضافة الكل:', [...suggestions, product]);
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
            className="fixed inset-0 bg-black/60 z-[1000]"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[1001] p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#FF4FA3]">✨ أكملِّي اللوك</h2>
              <button onClick={onClose} className="text-2xl">✕</button>
            </div>

            <div className="space-y-4">
              {suggestions.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-[#FF4FA3] font-bold">{item.price} درهم</p>
                  </div>
                  <button
                    onClick={() => setSelectedItems([...selectedItems, item])}
                    className="px-6 py-3 bg-[#FF4FA3] text-white rounded-lg font-bold"
                  >
                    أضف
                  </button>
                </div>
              ))}
            </div>

            {selectedItems.length > 0 && (
              <button
                onClick={addAllToCart}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold mt-6"
              >
                🛒 أضف الكل ({selectedItems.length + 1} قطع)
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// مودال السلة - Smart Upsell
// ============================================
export const SmartUpsellModal = ({ isOpen, onClose }) => {
  const [showOffer, setShowOffer] = useState(true);

  const handleAddOffer = () => {
    console.log('تم إضافة القطعة بـ 10 درهم');
    setShowOffer(false);
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
            className="fixed inset-0 bg-black/60 z-[1000]"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[1001] p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#FF4FA3]">✨ عرض خاص</h2>
              <button onClick={onClose} className="text-2xl">✕</button>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <span className="text-7xl mb-4 block">🎁</span>
              <h3 className="text-2xl font-bold mb-2">أضيفي هذه القطعة</h3>
              <p className="text-4xl font-bold text-[#FF4FA3] mb-2">10 درهم فقط</p>
              <p className="text-sm text-gray-500 mb-8">عرض خاص عند الدفع الآن</p>
              
              <button
                onClick={handleAddOffer}
                className="w-full bg-[#FF4FA3] text-white py-5 rounded-xl font-bold text-xl"
              >
                ✨ أضف
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};