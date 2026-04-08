export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "رقم الهاتف مطلوب" });

  try {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxB_RswIiUOjhHj4VNg2O0TUqrrnipkSwaScooCtSECxw5Rk_AJQsD22uBabrK7390B/exec";

    // إرسال الرقم إلى السكريبت
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors", // 🔑 منع خطأ CORS
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    // نعيد رسالة نجاح مباشرة لأن fetch لا يقرأ الرد عند no-cors
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء الاتصال بالسكريبت" });
  }
}