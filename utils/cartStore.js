import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // إضافة منتج إلى السلة
      addToCart: (product) => {
        set((state) => {
          // التحقق إذا كان المنتج موجوداً بالفعل
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // زيادة الكمية إذا كان موجوداً
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              )
            };
          } else {
            // إضافة منتج جديد
            return {
              items: [...state.items, { ...product, quantity: 1 }]
            };
          }
        });
      },
      
      // إزالة منتج من السلة
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },
      
      // تحديث كمية منتج
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        }));
      },
      
      // تفريغ السلة
      clearCart: () => {
        set({ items: [] });
      },
      
      // الحصول على عدد المنتجات في السلة
      getItemCount: () => {
        return get().items.reduce((total, item) => total + (item.quantity || 1), 0);
      },
      
      // الحصول على المجموع الكلي
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
      }
    }),
    {
      name: 'cart-storage', // اسم المفتاح في localStorage
    }
  )
);

export default useCartStore;