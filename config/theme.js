// ملف تكوين الألوان والمتغيرات للمتجر
const theme = {
  // الألوان الرئيسية
  colors: {
    primary: '#FF4D8D',
    primaryDark: '#E63E7B',
    primaryLight: '#FF8DB3',
    
    economy: '#9CA3AF',
    economyDark: '#6B7280',
    
    premium: '#FFD700',
    premiumDark: '#FBBF24',
    
    whatsapp: '#25D366',
    location: '#32CD32',
    ai: '#6A5ACD',
    
    sets: {
      women: '#8B5CF6',
      kids: '#F97316',
    },
    
    notification: '#EF4444',
    background: '#FAFAFA',
    
    text: {
      black: '#111111',
      gray: '#6B7280',
      light: '#9CA3AF',
    },
    
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },

  // الخطوط
  typography: {
    fontFamily: {
      sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },

  // المسافات
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },

  // الأحجام
  sizes: {
    icon: {
      sm: '20px',
      md: '24px',
      lg: '28px',
      xl: '32px',
    },
    button: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    cart: {
      top: '24px',
      bottom: '28px',
    },
  },

  // المدة الزمنية للأنيميشن
  animation: {
    duration: {
      shake: '0.3s',
      pulse: '0.5s',
      modal: '0.25s',
      toast: '0.2s',
      slide: '0.3s',
    },
  },

  // الأصوات
  sounds: {
    add: '/sounds/add.mp3',
    remove: '/sounds/remove.mp3',
    favorite: '/sounds/favorite.mp3',
    success: '/sounds/success.mp3',
    notify: '/sounds/notify.mp3',
    error: '/sounds/error.mp3',
  },

  // الرسائل
  messages: {
    addedToCart: '✔ تمت إضافة المنتج إلى السلة',
    removedFromCart: 'تم حذف المنتج من السلة',
    favoriteSaved: '❤ تمت الإضافة إلى المفضلة',
    orderSent: '✔ تم تجهيز طلبك، سيتم تحويلك إلى واتساب',
    cartEmpty: 'سلتك فارغة — ابدأ التسوق الآن',
    productReserved: '⏳ المنتج محجوز لمدة 20 دقيقة',
    holdExpired: '🔔 المنتج متاح مجددًا',
    lowStock: '🔥 بقيت قطعة واحدة فقط',
    popularItem: '⭐ هذا المنتج مطلوب كثيرًا',
    filterApplied: '✔ تم عرض المنتجات المناسبة',
    networkError: '⚠ تحقق من الإنترنت وحاول مرة أخرى',
    outOfStock: '⚠ هذا المقاس غير متوفر',
    sendFailed: '❌ لم يتم إرسال الطلب، حاول مرة أخرى',
  },

  // الفئات
  categories: [
    { id: 'women-premium', title: 'نساء', icon: '⭐', price: '90', type: 'premium' },
    { id: 'women-economy', title: 'نساء', icon: '💰', price: '60', type: 'economy' },
    { id: 'girls-premium', title: 'بنات', icon: '⭐', price: '35', type: 'premium' },
    { id: 'girls-economy', title: 'بنات', icon: '💰', price: '20', type: 'economy' },
    { id: 'boys-premium', title: 'أولاد', icon: '⭐', price: '35', type: 'premium' },
    { id: 'boys-economy', title: 'أولاد', icon: '💰', price: '20', type: 'economy' },
    { id: 'sets-women', title: 'أطقم نساء', icon: '✨', price: '120', type: 'sets' },
    { id: 'sets-kids', title: 'أطقم أطفال', icon: '✨', price: '80', type: 'sets' },
  ],

  // المقاسات
  sizes: {
    women: ['S', 'M', 'L', 'XL', 'XXL'],
    kids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
};

module.exports = theme;