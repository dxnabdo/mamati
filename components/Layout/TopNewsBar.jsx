// components/Layout/TopNewsBar.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopNewsBar = () => {
  const newsItems = [
    "🎁 توصيل مجاني فوق 200 درهم",
    "📱 جديد يومياً على TikTok",
    "✨ جودة أوروبية بأسعار ذكية",
    "🛍️ اكتشف مامتي ماركيت"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 3000); // 3 ثواني (2-3 ثواني)
    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-center px-4 py-2 h-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              y: { duration: 0.6, ease: 'easeOut' },
              opacity: { duration: 0.4 }
            }}
            className="text-sm font-medium text-center"
          >
            {newsItems[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopNewsBar;