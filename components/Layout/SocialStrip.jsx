// components/Layout/SocialStrip.jsx
import React from 'react';

const SocialStrip = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-white/50">
      {/* جهة اليمين: أيقونات التواصل على شكل أزرار خضراء فاتحة */}
      <div className="flex gap-3">
        <a 
          href="https://www.tiktok.com/@mamaty_bal_marrakech?_r=1&_t=ZS-95EfmGgNeCY" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#A8E6CF] hover:bg-[#8fd4bb] transition-colors p-2 rounded-full"
        >
          <img src="/icons/tiktok.png" alt="تيك توك" className="w-5 h-5" />
        </a>
        <a 
          href="https://www.instagram.com/mamaty__bal_marrakech?igsh=endqOHcwMmU1MGFq" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#A8E6CF] hover:bg-[#8fd4bb] transition-colors p-2 rounded-full"
        >
          <img src="/icons/instagram.png" alt="انستغرام" className="w-5 h-5" />
        </a>
        <a 
          href="https://www.facebook.com/share/1EGQ2yrJZs/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#A8E6CF] hover:bg-[#8fd4bb] transition-colors p-2 rounded-full"
        >
          <img src="/icons/facebook.png" alt="فيسبوك" className="w-5 h-5" />
        </a>
        <a 
          href="https://www.youtube.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#A8E6CF] hover:bg-[#8fd4bb] transition-colors p-2 rounded-full"
        >
          <img src="/icons/youtube.png" alt="يوتيوب" className="w-5 h-5" />
        </a>
      </div>
      {/* جهة اليسار: نص "تابعنا على" مع سهم */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <span className="font-medium">تابعنا على</span>
        <span className="text-base">➡️</span>
      </div>
    </div>
  );
};

export default SocialStrip;