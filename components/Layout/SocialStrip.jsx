// components/Layout/SocialStrip.jsx
import React from 'react';

const SocialStrip = () => {
  return (
    <div className="w-full flex justify-center items-center gap-3 py-0 px-2 bg-white/50">
      {/* الأيقونات */}
      <div className="flex items-center gap-2">
        <a href="https://www.tiktok.com/@mamaty_bal_marrakech?_r=1&_t=ZS-95EfmGgNeCY" target="_blank" rel="noopener noreferrer">
          <img src="/icons/tiktok.png" alt="تيك توك" className="w-4 h-4" />
        </a>
        <a href="https://www.instagram.com/mamaty__bal_marrakech?igsh=endqOHcwMmU1MGFq" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram.png" alt="انستغرام" className="w-4 h-4" />
        </a>
        <a href="https://www.facebook.com/share/1EGQ2yrJZs/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook.png" alt="فيسبوك" className="w-4 h-4" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src="/icons/youtube.png" alt="يوتيوب" className="w-4 h-4" />
        </a>
      </div>
      {/* النص مع الأيقونة */}
      <div className="flex items-center gap-1 text-xs text-gray-600">
        <span>تابعنا على</span>
        <img src="/icons/right-up.png" alt="متابعة" className="w-3 h-3" />
      </div>
    </div>
  );
};

export default SocialStrip;