import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // التحقق من صحة البريد الإلكتروني
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // التحقق من المدخلات
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    if (!validateEmail(email)) {
      setError('البريد الإلكتروني غير صحيح');
      return;
    }

    setIsLoading(true);

    // محاكاة التحقق من صحة البيانات
    setTimeout(() => {
      // التحقق من وجود المستخدم في localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // تسجيل الدخول ناجح
        localStorage.setItem('userToken', 'user-token-' + Date.now());
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', user.name);
        
        setSuccess('تم تسجيل الدخول بنجاح');
        
        // التوجيه إلى الصفحة الرئيسية بعد ثانية
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // ✅ تسجيل عبر Google (محاكاة)
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    
    // محاكاة تسجيل Google
    setTimeout(() => {
      // إنشاء مستخدم وهمي من Google
      const googleUser = {
        email: 'user@gmail.com',
        name: 'مستخدم Google',
        id: 'google-' + Date.now()
      };
      
      // حفظ بيانات المستخدم
      localStorage.setItem('userToken', 'google-token-' + Date.now());
      localStorage.setItem('userEmail', googleUser.email);
      localStorage.setItem('userName', googleUser.name);
      
      // حفظ في قائمة المستخدمين
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (!users.find(u => u.email === googleUser.email)) {
        users.push({
          email: googleUser.email,
          name: googleUser.name,
          password: 'google-auth',
          id: googleUser.id
        });
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setSuccess('تم تسجيل الدخول عبر Google بنجاح');
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">تسجيل الدخول</h1>
        <p className="text-center text-gray-500 mb-8">مرحباً بعودتك إلى مامتي</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF8A5C]"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF8A5C]"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF8A5C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#E67A4F] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">أو</span>
          </div>
        </div>

        {/* زر تسجيل عبر Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <img src="/icons/google.png" alt="Google" className="w-6 h-6" />
          <span className="font-medium">تسجيل عبر Google</span>
        </button>

        <p className="text-center mt-6 text-gray-600">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="text-[#FF8A5C] font-bold hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </motion.div>
    </div>
  );
}