import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DrawerMenu from '../UI/DrawerMenu';

const MainHeader = ({ favoritesCount = 0, onSearch, onFilterToggle, hideSearch = false, searchPlaceholder = "كم عمر طفلك" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const isMamatiMarketPage = router.pathname === '/mamati-market';

  return (
    <>
      <div className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between gap-3 px-4 py-2">
          {/* الجهة اليسرى: أيقونة المفضلة وأيقونة مامتي ماركيت (تختفي في صفحة الماركت) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {!isMamatiMarketPage && (
              <Link href="/mamati-market">
                <img src="/icons/mamati.png" alt="مامتي ماركيت" className="w-6 h-6" />
              </Link>
            )}
            <Link href="/favorites" className="relative">
              <img src="/icons/heart.png" alt="المفضلة" className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-xs font-bold min-w-[18px] h-4 rounded-full flex items-center justify-center px-1">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div>

          {/* حقل البحث (وسط) */}
          {!hideSearch && (
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full py-2 pr-10 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF8A5C] text-right"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
                <img
                  src="/icons/search.png"
                  alt="بحث"
                  className="absolute left-3 top-2.5 w-5 h-5 opacity-50"
                />
              </div>
            </div>
          )}

          {/* الجهة اليمنى: الشعار */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img src="/mamaty-logo.png" alt="مامتي" className="h-12 w-auto" />
            </Link>
          </div>
        </div>
      </div>

      <DrawerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onSearch={onSearch}
      />
    </>
  );
};

export default MainHeader;