
import { playSound } from './soundEffects';
import { showToast } from './toastMessages';

/**
 * إنشاء رسالة واتساب للمنتج
 * @param {Object} product - معلومات المنتج
 * @param {string} customerName - اسم العميل (اختياري)
 * @returns {string} - نص الرسالة
 */
export function createWhatsAppMessage(product, customerName = 'عميل') {
  const genderMap = {
    'boy': 'ولد',
    'girls': 'بنت',
    'women': 'نساء',
    'sets': 'طقم'
  };

  const typeMap = {
    'premium': 'ممتاز',
    'economy': 'اقتصادي',
    'sets': 'أطقم'
  };

  const gender = genderMap[product.faction] || 'منتج';
  const type = typeMap[product.type] || '';

  return encodeURIComponent(
    `🛍️ *طلب جديد من BAL-MA*\n\n` +
    `👤 *العميل:* ${customerName}\n` +
    `📦 *المنتج:* ${gender} ${type}\n` +
    `📏 *المقاس:* ${product.size}\n` +
    `💰 *السعر:* ${product.price} درهم\n` +
    `🔢 *السيريال:* ${product.serial}\n` +
    `🔗 *الرابط:* ${window.location.origin}/product/${product.id}\n\n` +
    `✅ سيتم التواصل معك قريبًا`
  );
}

/**
 * إنشاء رسالة واتساب للسلة كاملة
 * @param {Array} items - منتجات السلة
 * @param {number} totalPrice - السعر الإجمالي
 * @returns {string} - نص الرسالة
 */
export function createCartWhatsAppMessage(items, totalPrice) {
  let productsList = '';
  
  items.forEach((item, index) => {
    const genderMap = {
      'boy': 'ولد',
      'girls': 'بنت',
      'women': 'نساء',
      'sets': 'طقم'
    };
    
    const typeMap = {
      'premium': 'ممتاز',
      'economy': 'اقتصادي',
      'sets': 'أطقم'
    };

    const gender = genderMap[item.faction] || 'منتج';
    const type = typeMap[item.type] || '';
    
    productsList += `${index + 1}. ${gender} ${type} - ${item.size} - ${item.price} درهم (سيريال: ${item.serial})\n`;
  });

  return encodeURIComponent(
    `🛍️ *طلب جديد من BAL-MA*\n\n` +
    `*المنتجات:*\n${productsList}\n` +
    `💰 *الإجمالي:* ${totalPrice} درهم\n` +
    `🔗 *رابط المتجر:* ${window.location.origin}\n\n` +
    `✅ سيتم التواصل معك قريبًا`
  );
}

// دالة إرسال الطلب إلى Google Sheet عبر Apps Script
export async function sendOrderToGoogleSheet(orderData) {
  try {
    // رابط Google Apps Script الذي حصلت عليه بعد النشر
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbwmC5dGlDUfp9qwRCxb4tCrLb9NpcRGQBVFx8IFr_amUedESA-uwUT3V1brZQclyHxqAw/exec';
    
    console.log('📤 جاري إرسال الطلب إلى Google Sheet:', orderData);
    
    // إرسال البيانات إلى Google Sheet
    const response = await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    console.log('✅ تم إرسال الطلب إلى Google Sheet بنجاح');
    
  } catch (error) {
    console.error('❌ خطأ في الإرسال إلى Google Sheet:', error);
  }
}

/**
 * فتح واتساب مع رسالة محددة
 * @param {string} phoneNumber - رقم الهاتف
 * @param {string} message - نص الرسالة (مرمز)
 */
export function openWhatsApp(phoneNumber = '212600000000', message) {
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  
  // تشغيل صوت النجاح
  playSound('success');
  
  // عرض رسالة تأكيد
  showToast('order_sent', 'success');
  
  // فتح واتساب
  window.open(url, '_blank');
}

/**
 * مشاركة منتج عبر واتساب
 * @param {Object} product - معلومات المنتج
 */
export function shareProductOnWhatsApp(product) {
  const message = createWhatsAppMessage(product);
  openWhatsApp('212600000000', message);
}

/**
 * مشاركة السلة عبر واتساب
 * @param {Array} items - منتجات السلة
 * @param {number} totalPrice - السعر الإجمالي
 * @param {string} customerPhone - رقم العميل (اختياري)
 * @param {string} customerName - اسم العميل (اختياري)
 */
export function shareCartOnWhatsApp(items, totalPrice, customerPhone = '', customerName = 'عميل') {
  // 1. إنشاء رسالة واتساب
  const message = createCartWhatsAppMessage(items, totalPrice);
  
  // 2. فتح واتساب (رقم المتجر ثابت)
  window.open(`https://wa.me/212663319599?text=${message}`, '_blank');
  
  // 3. تجهيز بيانات الطلب لـ Google Sheet
  const orderData = {
    orderId: `ORD-${Date.now()}`,
    date: new Date().toLocaleString('ar-MA'),
    customerName: customerName || 'عميل',
    // ✅ رقم العميل الحقيقي الذي تم اختياره أو إدخاله
    phone: customerPhone || '0660000000', // إذا لم يكن هناك رقم، استخدم الافتراضي
    products: items.map(item => 
      `${item.faction === 'boy' ? 'ولد' : 
        item.faction === 'girls' ? 'بنت' : 
        item.faction === 'women' ? 'نساء' : 'طقم'} 
        (مقاس:${item.size} - سيريال:${item.serial})`
    ).join(' | '),
    totalPrice: totalPrice + ' درهم',
    status: 'جديد',
    whatsappLink: window.location.href
  };
  
  // 4. إرسال إلى Google Sheet
  sendOrderToGoogleSheet(orderData);
  
  // 5. تشغيل الصوت والرسالة
  playSound('success');
  showToast('تم حفظ الطلب في قاعدة البيانات', 'success');
}