import React from 'react';
import { useRouter } from 'next/router';
import Icon from '../components/UI/Icon';
import Button from '../components/UI/Button';

export default function Exchange() {
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
          <h1 className="text-xl font-bold">سياسة الاستبدال</h1>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">🔄 شروط الاستبدال</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>يمكن استبدال المنتج خلال 7 أيام من تاريخ الشراء</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>يجب أن يكون المنتج بحالته الأصلية مع العلامة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>الاستبدال متاح لنفس المنتج بمقاس آخر</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>لا يمكن استبدال المنتجات بعد غسلها أو استخدامها</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">📋 خطوات الاستبدال</h2>
          <ol className="space-y-3 text-gray-600 list-decimal pr-5">
            <li>الاتصال بنا عبر واتساب</li>
            <li>إرسال صورة للمنتج والفاتورة</li>
            <li>تأكيد المقاس البديل المتوفر</li>
            <li>توصيل المنتج الجديد واستلام القديم</li>
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <p className="text-yellow-800 text-sm">
            ⚠️ في حالة عدم توفر المقاس البديل، يمكن استرجاع المبلغ كاملاً.
          </p>
        </div>

        <Button
          variant="whatsapp"
          size="lg"
          fullWidth
          onClick={() => window.open('https://wa.me/0663319599', '_blank')}
        >
          تواصل معنا عبر واتساب
        </Button>

        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={() => router.push('/')}
        >
          العودة للتسوق
        </Button>
      </div>
    </div>
  );
}