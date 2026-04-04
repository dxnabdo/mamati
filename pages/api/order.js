// pages/api/order.js
export default async function handler(req, res) {
  // السماح فقط بطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // ضع رابط Web App هنا
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_E8k96_UhRvnuYf4XSq7UhMyb67n5Lby7sqi2LPMnnWyd41A04mq863HHXPugGbm-/exec';

  try {
    const { items, total, phone } = req.body;

    // التحقق من صحة البيانات
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'بيانات المنتجات غير صالحة' });
    }

    console.log('إرسال إلى Apps Script:', { items, total, phone });

    // إرسال الطلب إلى Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, total, phone }),
    });

    // قراءة الرد كنص
    const responseText = await response.text();
    console.log('الرد من Apps Script (نص):', responseText.substring(0, 300));

    // محاولة تحويل الرد إلى JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('الرد ليس JSON صالح:', responseText);
      return res.status(500).json({
        message: 'الرد من Apps Script ليس JSON صالح',
        raw: responseText.substring(0, 200)
      });
    }

    if (result.success) {
      return res.status(200).json({ message: 'تم الإرسال', orderId: result.orderId });
    } else {
      throw new Error(result.error || 'فشل الإرسال');
    }
  } catch (error) {
    console.error('خطأ في API route:', error);
    return res.status(500).json({ message: 'خطأ في الخادم', error: error.message });
  }
}