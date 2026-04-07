// components/PhoneRegisterPopup.jsx
import React, { useState, useEffect } from "react";

export default function PhoneRegisterPopup() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // نتحقق من وجود popupShown في localStorage
    const hasShown = localStorage.getItem("popupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem("popupShown", "true");
      }, 6000); // 6 ثوانٍ
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => setShow(false);
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone.replace(/\s/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return setMessage("يرجى إدخال رقم الهاتف");
    if (!validatePhone(phone)) return setMessage("رقم الهاتف يجب أن يكون أرقام فقط (10-15 رقم)");
    setLoading(true);
    setMessage("");
    try {
      const payload = [{ Phone: phone.trim(), Date: new Date().toLocaleString("ar-EG"), Source: "Website Popup" }];
      const res = await fetch("https://api.sheetbest.com/sheets/55a38627-8b83-4a28-afa2-e43ea9fec380", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("✅ تم التسجيل بنجاح!");
        setPhone("");
        setTimeout(() => closePopup(), 2000);
      } else {
        setMessage("❌ فشل الإرسال");
      }
    } catch (error) {
      setMessage("❌ حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999999]" onClick={closePopup}>
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={closePopup} className="absolute top-3 left-3 text-3xl text-black hover:opacity-70">✕</button>
        <div className="text-center">
          <img src="/mamaty-logo.png" alt="مامتي" className="h-20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">متجر ماماتي للملابس الأوروبية</h2>
          <p className="text-lg text-orange-500 font-semibold mb-3">🔥 دخل رقمك وكون أول من يتوصل بالجديد.. قبل ما يسالي</p>
          <input
            type="tel"
            placeholder="رقم الهاتف (واتساب)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-center mb-4"
            dir="ltr"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:bg-gray-400"
          >
            {loading ? "جاري الإرسال..." : "أخبرني عند وصول الجديد"}
          </button>
          <p className="mt-4 text-sm text-gray-500">🔥 %أكثر من 1000 شخص مشترك — رقمك آمن 100</p>
          {message && (
            <p className={`mt-3 p-2 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}