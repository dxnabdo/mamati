import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductsGrid = ({ products = [], categoryInfo = { icon: '/icons/eco.png', text: 'منتجات' }, onProductPress, hideViewMode = false, hideHeader = false }) => {
  const [viewMode, setViewMode] = useState(2);

  const getColumns = () => {
    if (viewMode === 1) return "grid-cols-1";
    if (viewMode === 2) return "grid-cols-2";
    if (viewMode === 4) return "grid-cols-4";
    return "grid-cols-2";
  };

  return (
    <div>
      {/* شريط العنوان مع توزيع العناصر: معلومات الفئة يمين، أزرار العرض يسار */}
      {!hideHeader && (
        <div className="flex items-center justify-between mb-4 px-2">
          {/* معلومات الفئة (في اليسار) */}
          <div className="flex items-center gap-2">
            <img src={categoryInfo.icon} className="w-5 h-5" alt="category icon" />
            <h2 className="text-base font-bold">{categoryInfo.text}</h2>
            <span className="bg-black text-white text-xs px-2 py-1 rounded-none">
              {products.length} منتج
            </span>
          </div>

          {/* أزرار تغيير العرض (في أقصى اليمين) - تظهر فقط إذا لم نطلب إخفاءها */}
          {!hideViewMode && (
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode(1)} className={`p-1 rounded-none ${viewMode === 1 ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                <img src="/icons/view1.png" className="w-5 h-5" alt="عرض عمود واحد" />
              </button>
              <button onClick={() => setViewMode(2)} className={`p-1 rounded-none ${viewMode === 2 ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                <img src="/icons/view2.png" className="w-5 h-5" alt="عرض عمودين" />
              </button>
              <button onClick={() => setViewMode(4)} className={`p-1 rounded-none ${viewMode === 4 ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                <img src="/icons/view4.png" className="w-5 h-5" alt="عرض أربعة أعمدة" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* شبكة المنتجات */}
      <div className={`grid ${getColumns()} gap-4`}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={onProductPress}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;