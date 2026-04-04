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
    
    return () => {
      clearTimeout(timer);
    };
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
          borderRadius: '20px',
          padding: '30px',
          width: '450px',
          maxWidth: '90%',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق - أسود بدون دائرة */}
        <button
          onClick={closePopup}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            fontSize: '32px',
            fontWeight: '300',
            border: 'none',
            background: 'none',
            color: '#000',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '5px',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          ✕
        </button>

        {/* المحتوى */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          {/* أيقونة ملابس الأطفال - مكونة من 3 أيقونات */}
          <div style={{ 
            fontSize: '70px', 
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            alignItems: 'center'
          }}>
            <span role="img" aria-label="تيشيرت أطفال">👕</span>
            <span role="img" aria-label="قبعة أطفال">🧢</span>
          </div>

          {/* العنوان الرئيسي */}
          <h2 style={{ 
            fontSize: '28px', 
            marginBottom: '10px', 
            color: '#333',
            fontWeight: 'bold'
          }}>
            🔥 Mamaty Bal Marrakech
          </h2>
          
          {/* العنوان الفرعي */}
          <h3 style={{ 
            fontSize: '20px', 
            marginBottom: '15px', 
            color: '#f97316',
            fontWeight: '600'
          }}>
            انضمي إلى نادي المتابعات المميّزات
          </h3>
          
          {/* الوصف */}
          <p style={{ 
            color: '#4a5568', 
            marginBottom: '15px',
            lineHeight: '1.6',
            fontSize: '16px'
          }}>
            وكوني أول من يكتشف الدفعات الجديدة من ملابس الأطفال والرضع 🎀
          </p>
          
          <p style={{ 
            color: '#e53e3e', 
            marginBottom: '20px',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            القطع المميزة تصل بكميات محدودة وغالباً تنفد بسرعة.
          </p>

          <p style={{ 
            color: '#2d3748', 
            marginBottom: '20px',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            📱 أدخلي رقم هاتفك (واتساب)
          </p>

          <p style={{ 
            color: '#718096', 
            marginBottom: '25px',
            fontSize: '14px'
          }}>
            وسنرسل لك إشعاراً فور وصول الدفعة الجديدة
          </p>

          <form onSubmit={handleSubmit}>
            {/* حقل رقم الهاتف */}
            <input
              type="tel"
              placeholder="رقم الهاتف (واتساب)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: '100%',
                padding: '14px',
                marginBottom: '25px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '16px',
                boxSizing: 'border-box',
                direction: 'ltr',
                textAlign: 'left'
              }}
            />

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: loading ? '#cbd5e0' : '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 4px 6px rgba(249,115,22,0.3)'
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
              {loading ? 'جاري الإرسال...' : 'اخبرني عند وصول الجديد'}
            </button>
          </form>

          {/* رسالة التأكيد أو الخطأ */}
          {message && (
            <p style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: message.includes('✅') ? '#c6f6d5' : '#fed7d7',
              color: message.includes('✅') ? '#22543d' : '#742a2a',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}