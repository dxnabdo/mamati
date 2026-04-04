import React from 'react';
import { useRouter } from 'next/router';
import Icon from '../components/UI/Icon';
import Button from '../components/UI/Button';

export default function Delivery() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="arrow-left" size="sm" />
          </button>
          <h1 className="text-xl font-bold">سياسة التوصيل</h1>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">🚚 معلومات التوصيل</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
             <span>التوصيل متاح داخل مدينة مراكش و النواحي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
               <span>مدة التوصيل في مراكش: 1-2 أيام </span> 
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
               <span>مدة التوصيل نواحي مراكش: 2-3 أيام </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>تكلفة التوصيل داخل مراكش: 20 درهم</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>تكلفة التوصيل نواحي مراكش: 30 درهم</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>توصيل مجاني للطلبات فوق 150 درهم</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">⏰ أوقات التوصيل</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span>🕘</span>
              <span>السبت - الخميس: 9:00 صباحاً - 9:00 مساءً</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🕘</span>
              <span>الجمعة: مغلق</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">📍 مناطق التوصيل</h2>
          <ul className="space-y-3 text-gray-600">
            <li>مراكش</li>
            <li>النواحي</li>
          </ul>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push('/')}
        >
          العودة للتسوق
        </Button>
      </div>
    </div>
  );
}