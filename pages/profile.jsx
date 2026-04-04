import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // بيانات تجريبية
  const user = {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0612345678',
    joinDate: 'يناير 2024'
  };

  const orders = [
    { id: 'ORD001', date: '2024-03-01', total: 120, status: 'تم التسليم', items: 3 },
    { id: 'ORD002', date: '2024-02-25', total: 85, status: 'قيد المعالجة', items: 2 },
    { id: 'ORD003', date: '2024-02-15', total: 210, status: 'تم الشحن', items: 4 },
  ];

  const addresses = [
    { id: 1, type: 'المنزل', address: '12 شارع الحسن الثاني، مراكش', phone: '0612345678' },
    { id: 2, type: 'العمل', address: 'مكتب 5، برج التجاري، الدار البيضاء', phone: '0612345678' },
  ];

  const recentProducts = [
    { id: 1, name: '👦 ولد 2 سنوات', price: 20, image: '/BAL-MA-PR/boy_2_20_1.png' },
    { id: 2, name: '👧 بنت 4 سنوات', price: 35, image: '/BAL-MA-PR/girls_5_35_2.png' },
    { id: 3, name: '👦 ولد 6 سنوات', price: 35, image: '/BAL-MA-PR/boy_6_35_1.png' },
  ];

  // ✅ دالة تسجيل الخروج
  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // محاكاة عملية تسجيل الخروج
    setTimeout(() => {
      // هنا يمكنك مسح بيانات الجلسة من localStorage
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      
      // توجيه المستخدم إلى صفحة تسجيل الدخول
      router.push('/login');
      
      // إظهار رسالة نجاح (يمكنك استخدام toastManager)
      console.log('✅ تم تسجيل الخروج بنجاح');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white pb-20">
      {/* الهيدر مع زر تسجيل الخروج */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src="/icons/arrow-left.png" alt="رجوع" className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">حسابي</h1>
          
          {/* ✅ زر تسجيل الخروج مع حالة التحميل */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`text-sm font-medium transition-colors ${
              isLoggingOut ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:text-red-600'
            }`}
          >
            {isLoggingOut ? 'جاري...' : 'تسجيل الخروج'}
          </button>
        </div>
      </div>

      {/* معلومات المستخدم */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF8A5C] to-[#FFD93D] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500 text-sm">عضو منذ {user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'orders' ? 'text-[#FF8A5C] border-b-2 border-[#FF8A5C]' : 'text-gray-500'}`}
          >
            طلباتي
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'info' ? 'text-[#FF8A5C] border-b-2 border-[#FF8A5C]' : 'text-gray-500'}`}
          >
            معلومات الحساب
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'addresses' ? 'text-[#FF8A5C] border-b-2 border-[#FF8A5C]' : 'text-gray-500'}`}
          >
            العناوين
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'favorites' ? 'text-[#FF8A5C] border-b-2 border-[#FF8A5C]' : 'text-gray-500'}`}
          >
            المفضلة ❤️
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'recent' ? 'text-[#FF8A5C] border-b-2 border-[#FF8A5C]' : 'text-gray-500'}`}
          >
            شوهدت مؤخراً
          </button>
        </div>
      </div>

      {/* محتوى التبويبات */}
      <div className="p-4">
        {/* الطلبات */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold">طلب #{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'تم التسليم' ? 'bg-green-100 text-green-700' :
                    order.status === 'قيد المعالجة' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span>{order.items} منتجات</span>
                  <span className="font-bold text-[#FF8A5C]">{order.total} درهم</span>
                </div>
                <button className="mt-3 text-[#FF8A5C] text-sm font-medium">
                  تتبع الطلب →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* معلومات الحساب */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">الاسم</label>
              <input type="text" value={user.name} className="w-full p-3 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">البريد الإلكتروني</label>
              <input type="email" value={user.email} className="w-full p-3 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">رقم الهاتف</label>
              <input type="tel" value={user.phone} className="w-full p-3 border border-gray-200 rounded-lg" />
            </div>
            <button className="w-full bg-[#FF8A5C] text-white py-3 rounded-lg font-bold">
              حفظ التغييرات
            </button>
          </div>
        )}

        {/* العناوين */}
        {activeTab === 'addresses' && (
          <div className="space-y-3">
            {addresses.map(addr => (
              <div key={addr.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold">{addr.type}</span>
                  <button className="text-[#FF8A5C] text-sm">تعديل</button>
                </div>
                <p className="text-gray-600 text-sm">{addr.address}</p>
                <p className="text-gray-500 text-xs mt-2">{addr.phone}</p>
              </div>
            ))}
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold border-2 border-dashed border-gray-300">
              + إضافة عنوان جديد
            </button>
          </div>
        )}

        {/* المفضلة */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-2 gap-3">
            {recentProducts.map(p => (
              <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-[#FF8A5C] font-bold">{p.price} درهم</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* المنتجات التي شاهدتها */}
        {activeTab === 'recent' && (
          <div className="grid grid-cols-2 gap-3">
            {recentProducts.map(p => (
              <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
                <div className="p-2">
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-[#FF8A5C] font-bold">{p.price} درهم</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}