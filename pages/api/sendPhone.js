// pages/api/sendPhone.js
export default async function handler(req, res) {
  // فقط طلب POST مسموح
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "رقم الهاتف مطلوب" });
  }

  try {
    // ضع هنا رابط Google Apps Script الذي نشرته كـ Web App
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxqGQdk1M8H8_VWIDo_1Bok7RKiX1goN3syTiTII7dZJiZj9YKzoOoOXVYdZc8CdZfd/exec";

    // إرسال الرقم إلى Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    // قراءة الرد من السكريبت
    const data = await response.json();

    // إعادة الرد للواجهة الأمامية
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء الاتصال بالسكريبت" });
  }
}