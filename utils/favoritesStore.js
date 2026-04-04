import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],
      // إضافة أو إزالة من المفضلة
      toggleFavorite: (product) => {
        const exists = get().items.some(item => item.id === product.id);
        if (exists) {
          set({ items: get().items.filter(item => item.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      // التحقق إذا كان المنتج في المفضلة
      isFavorite: (productId) => get().items.some(item => item.id === productId),
    }),
    { name: 'favorites-storage' }
  )
);

export default useFavoritesStore;