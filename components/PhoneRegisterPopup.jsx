import React, { useState, useEffect } from "react";

export default function PhoneRegisterPopup() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("⏰ بدء العد التنازلي 4 ثواني...");
    const timer = setTimeout(() => {
      console.log("🎯 انتهت الـ 4 ثواني - سيتم عرض النافذة الآن");
      setShow(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setMessage("يرجى إدخال رقم الهاتف");
      return;
    }
    if (!validatePhone(phone)) {
      setMessage("رقم الهاتف يجب أن يكون أرقام فقط (10-15 رقم)");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const payload = [{
        Phone: phone.trim(),
        Date: new Date().toLocaleString("ar-EG"),
        Source: "Website Popup"
      }];
      const res = await fetch(
        "https://api.sheetbest.com/sheets/55a38627-8b83-4a28-afa2-e43ea9fec380",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  if (!show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999
      }}
      onClick={closePopup}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '30px 24px 40px',
          width: '480px',
          maxWidth: '90%',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق - أسود بدون دائرة */}
        <button
          onClick={closePopup}
          style={{
            position: 'absolute',
            top: '16px',
            left: '20px',
            fontSize: '28px',
            fontWeight: '300',
            border: 'none',
            background: 'none',
            color: '#000',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0',
            zIndex: 10
          }}
        >
          ✕
        </button>

        {/* 1️⃣ اللوغو (نص Mamati وسط) */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#f97316',
            letterSpacing: '1px'
          }}>
            mamati
          </span>
        </div>

        {/* 2️⃣ الترحيب */}
        <p style={{
          fontSize: '18px',
          fontWeight: '500',
          color: '#1a202c',
          marginBottom: '12px'
        }}>
          متجر ماماتي للملابس الأوروبية يرحب بكم
        </p>

        {/* 3️⃣ العبارة القوية */}
        <p style={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#e53e3e',
          marginBottom: '20px',
          lineHeight: 1.3
        }}>
          دخل رقمك وكون أول من يتوصل بالجديد.. قبل ما تسالي 🔥
        </p>

        {/* 4️⃣ خانة الإدخال */}
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="رقم الهاتف واتساب"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              padding: '16px',
              marginBottom: '20px',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              fontSize: '16px',
              boxSizing: 'border-box',
              direction: 'ltr',
              textAlign: 'center',
              color: '#2d3748',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#f97316'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />

          {/* 5️⃣ الثقة والتحفيز */}
          <div style={{
            backgroundColor: '#fff7ed',
            padding: '12px',
            borderRadius: '16px',
            marginBottom: '25px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#9c4221'
          }}>
            🔥 أكثر من 1000 شخص مشترك — رقمك آمن 100%
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#cbd5e0' : '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginBottom: '15px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#ea580c';
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#f97316';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {loading ? 'جاري الإرسال...' : 'أخبرني عند وصول الجديد'}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: message.includes('✅') ? '#c6f6d5' : '#fed7d7',
            color: message.includes('✅') ? '#22543d' : '#742a2a',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}