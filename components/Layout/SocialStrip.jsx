import React from 'react';

const SocialStrip = () => {
  return (
    // ✅ تغيير fixed إلى sticky
    <div className="bg-white border-b border-gray-200 pt-[18px] pb-0 px-[8px] sticky top-0 z-40">
      <div className="flex justify-center items-center gap-6">
        
        {/* فيسبوك */}
        <a 
          href="https://https://www.facebook.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <img 
            src="/icons/facebook.png" 
            alt="فيسبوك" 
            className="w-5 h-5"
          />
        </a>

        {/* انستغرام */}
        <a 
          href="https://www.instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <img 
            src="/icons/instagram.png" 
            alt="انستغرام" 
            className="w-5 h-5"
          />
        </a>

        {/* تيك توك */}
        <a 
          href="https://tiktok.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <img 
            src="/icons/tiktok.png" 
            alt="تيك توك" 
            className="w-5 h-5"
          />
        </a>

        {/* يوتيوب */}
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <img 
            src="/icons/youtube.png" 
            alt="يوتيوب" 
            className="w-5 h-5"
          />
        </a>

        {/* جيميل */}
        <div className="cursor-default flex items-center justify-center">
          <img 
            src="/icons/gmail.png" 
            alt="جيميل" 
            className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>

      </div>
    </div>
  );
};

export default SocialStrip;