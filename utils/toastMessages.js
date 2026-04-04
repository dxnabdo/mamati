// نظام الرسائل المنبثقة
import { playSound } from './soundEffects';

let toastContainer = null;

// الرسائل المتوفرة
const messages = {
  added_to_cart: {
    text: '✔ تمت إضافة المنتج إلى السلة',
    type: 'success',
    duration: 2000,
    sound: 'add'
  },
  removed_from_cart: {
    text: 'تم حذف المنتج من السلة',
    type: 'info',
    duration: 1500,
    sound: 'remove'
  },
  favorite_saved: {
    text: '❤ تمت الإضافة إلى المفضلة',
    type: 'success',
    duration: 1500,
    sound: 'favorite'
  },
  order_sent: {
    text: '✔ تم تجهيز طلبك، سيتم تحويلك إلى واتساب',
    type: 'success',
    duration: 2500,
    sound: 'success'
  },
  cart_empty: {
    text: 'سلتك فارغة — ابدأ التسوق الآن',
    type: 'info',
    duration: 2000
  },
  product_reserved: {
    text: '⏳ المنتج محجوز لمدة 20 دقيقة',
    type: 'warning',
    duration: 2500
  },
  hold_expired_notice: {
    text: '🔔 المنتج متاح مجددًا',
    type: 'info',
    duration: 2500,
    sound: 'notify'
  },
  low_stock: {
    text: '🔥 بقيت قطعة واحدة فقط',
    type: 'warning',
    duration: 3000
  },
  popular_item: {
    text: '⭐ هذا المنتج مطلوب كثيرًا',
    type: 'info',
    duration: 2000
  },
  filter_applied: {
    text: '✔ تم عرض المنتجات المناسبة',
    type: 'success',
    duration: 1500
  },
  network_error: {
    text: '⚠ تحقق من الإنترنت وحاول مرة أخرى',
    type: 'error',
    duration: 3000,
    sound: 'error'
  },
  out_of_stock: {
    text: '⚠ هذا المقاس غير متوفر',
    type: 'error',
    duration: 2500,
    sound: 'error'
  },
  send_failed: {
    text: '❌ لم يتم إرسال الطلب، حاول مرة أخرى',
    type: 'error',
    duration: 3000,
    sound: 'error'
  }
};

// إنشاء عنصر Toast
function createToastElement() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

// عرض رسالة
export function showToast(messageKey, type = 'success', customMessage = null) {
  const message = messages[messageKey] || { text: customMessage || messageKey, type, duration: 2000 };
  const container = createToastElement();
  
  // تشغيل الصوت إذا وجد
  if (message.sound) {
    playSound(message.sound);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-${message.type || type} slide-up`;
  toast.textContent = message.text;
  toast.style.cssText = `
    background-color: ${getColorByType(message.type || type)};
    color: white;
    padding: 8px 16px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    margin-bottom: 8px;
    text-align: center;
    direction: rtl;
    white-space: nowrap;
  `;
  
  container.appendChild(toast);
  
  // إخفاء الرسالة بعد المدة
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.2s';
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 200);
  }, message.duration || 2000);
}

// الحصول على لون حسب نوع الرسالة
function getColorByType(type) {
  switch(type) {
    case 'success': return '#22C55E';
    case 'error': return '#EF4444';
    case 'warning': return '#F59E0B';
    case 'info': return '#3B82F6';
    default: return '#22C55E';
  }
}

// إخفاء جميع الرسائل
export function hideAllToasts() {
  if (toastContainer) {
    toastContainer.innerHTML = '';
  }
}