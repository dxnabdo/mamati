// components/Layout/SocialStrip.jsx
import React from 'react';

const SocialStrip = () => {
  return (
    <div className="w-full bg-white/50">
      {/* النص مع الأيقونة في الأعلى (بدون padding أو margin) */}
      <div className="flex justify-center items-center gap-1 text-sm text-gray-700 py-0">
        <span>تابعنا على</span>
        <img src="/icons/right-up.png" alt="متابعة" className="w-4 h-4" />
      </div>
      {/* أيقونات التواصل تحت النص مباشرة (بدون مسافات) */}
      <div className="flex justify-center gap-4 py-0">
        <a href="https://www.tiktok.com/@mamaty_bal_marrakech?_r=1&_t=ZS-95EfmGgNeCY" target="_blank" rel="noopener noreferrer">
          <img src="/icons/tiktok.png" alt="تيك توك" className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/mamaty__bal_marrakech?igsh=endqOHcwMmU1MGFq" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram.png" alt="انستغرام" className="w-5 h-5" />
        </a>
        <a href="https://www.facebook.com/share/1EGQ2yrJZs/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook.png" alt="فيسبوك" className="w-5 h-5" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/youtube.png" alt="يوتيوب" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default SocialStrip;