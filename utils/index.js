// utils/index.js

// استيراد مباشر للملفات (وليس من مجلدات فرعية)
import useCartStore from './cartStore';
import useFavoritesStore from './favoritesStore';
import { getAllProducts, getProductsByCategory, getCategoryType, getCategoryIcon, getCategoryName, parseImageFilename } from './productsParser';
import { initSounds, playSound, stopAllSounds } from './soundEffects';
import { showToast, hideAllToasts, toastManager } from './toastMessages';
import { createWhatsAppMessage, createCartWhatsAppMessage, openWhatsApp, shareProductOnWhatsApp, shareCartOnWhatsApp } from './whatsappMessage';

// تصدير كل شيء بشكل صريح
export {
  // Cart Store
  useCartStore,
  
  // Favorites Store
  useFavoritesStore,
  
  // Products Parser
  getAllProducts,
  getProductsByCategory,
  getCategoryType,
  getCategoryIcon,
  getCategoryName,
  parseImageFilename,
  
  // Sound Effects
  initSounds,
  playSound,
  stopAllSounds,
  
  // Toast Messages
  showToast,
  hideAllToasts,
  toastManager,
  
  // WhatsApp Messages
  createWhatsAppMessage,
  createCartWhatsAppMessage,
  openWhatsApp,
  shareProductOnWhatsApp,
  shareCartOnWhatsApp,
};

// تصدير افتراضي للاستخدام المريح
export default {
  useCartStore,
  useFavoritesStore,
  getAllProducts,
  getProductsByCategory,
  getCategoryType,
  getCategoryIcon,
  getCategoryName,
  parseImageFilename,
  initSounds,
  playSound,
  stopAllSounds,
  showToast,
  hideAllToasts,
  toastManager,
  createWhatsAppMessage,
  createCartWhatsAppMessage,
  openWhatsApp,
  shareProductOnWhatsApp,
  shareCartOnWhatsApp,
};