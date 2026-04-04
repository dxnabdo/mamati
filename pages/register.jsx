import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // إرسال بريد التفعيل
  const sendConfirmationEmail = async (userEmail, userName, token) => {
    const activationLink = `http://localhost:3000/activate?token=${token}`;
    const templateParams = {
      to_email: userEmail,
      name: userName,
      activation_link: activationLink,
    };

    try {
      const result = await emailjs.send(
        "service_ctu5bln",      // استبدل بـ Service ID الخاص بك
        "template_v3o1bs2",     // استبدل بـ Template ID الخاص بك
        templateParams,
        "5iANi3fqQ5U_8CrRH"       // استبدل بـ Public Key الخاص بك
      );
      console.log("✅ Email sent successfully:", result);
    } catch (error) {
      console.error("❌ Failed to send email:", error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // إنشاء رمز تفعيل عشوائي
    const token = Math.random().toString(36).substring(2);

    // حفظ بيانات المستخدم (محاكاة)
    const user = {
      name,
      email,
      password,
      verified: false,
      token,
    };
    localStorage.setItem("user", JSON.stringify(user));

    // إرسال الإيميل
    sendConfirmationEmail(email, name, token);

    alert("✅ تم التسجيل بنجاح! يرجى التحقق من بريدك لتفعيل الحساب.");
  };

  return (
    <div className="register-container">
      <style>
        {`
          .register-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
          }
          .register-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            width: 100%;
            max-width: 400px;
            transition: transform 0.3s ease;
          }
          .register-card:hover {
            transform: translateY(-5px);
          }
          .register-title {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 28px;
            font-weight: 600;
            position: relative;
          }
          .register-title::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background: #667eea;
            margin: 10px auto 0;
            border-radius: 2px;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s, box-shadow 0.3s;
            box-sizing: border-box;
          }
          .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          .register-btn {
            width: 100%;
            padding: 14px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
            margin-top: 10px;
          }
          .register-btn:hover {
            background: #5a67d8;
          }
          .register-btn:active {
            transform: scale(0.98);
          }
          .footer-text {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 14px;
          }
        `}
      </style>

      <div className="register-card">
        <h2 className="register-title">إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            تسجيل
          </button>
        </form>
        <p className="footer-text">بالنقر على تسجيل، أنت توافق على شروط الخدمة</p>
      </div>
    </div>
  );
}