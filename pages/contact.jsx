import React from 'react';
import { useRouter } from 'next/router';
import Icon from '../components/UI/Icon';
import Button from '../components/UI/Button';

export default function Contact() {
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
          <h1 className="text-xl font-bold">تواصل معنا</h1>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="w-20 h-20 bg-[#FF4D8D] rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="contact" size="xl" />
          </div>
          <h2 className="text-xl font-bold mb-2">MAMATY</h2>
          <p className="text-gray-500 text-sm mb-4">ةمتجر ملابس  الاطفال مستورة من اوروبا </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">📞 معلومات الاتصال</h2>
          
          <button 
            onClick={() => window.open('https://wa.me/212663319599', '_blank')}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="whatsapp" size="md" />
            </div>
            <div className="text-right">
              <p className="font-bold">واتساب</p>
              <p className="text-xs text-gray-500">+212 663319599</p>
            </div>
          </button>

          <button 
            onClick={() => window.location.href = 'mailto:info@bal-ma.com'}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">@</span>
            </div>
            <div className="text-right">
              <p className="font-bold">البريد الإلكتروني</p>
              <p className="text-xs text-gray-500">Mamaty@gmail.com</p>
            </div>
          </button>

          <button 
            onClick={() => window.open('https://maps.app.goo.gl/b72wucqNLWLbLJjQ7', '_blank')}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Icon name="location" size="md" />
            </div>
            <div className="text-right">
              <p className="font-bold">العنوان</p>
              <p className="text-xs text-gray-500">مراكش، المغرب</p>
            </div>
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-3">⏰ ساعات العمل</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span>السبت - الخميس</span>
              <span>9:00 - 23:00</span>
            </div>
            <div className="flex justify-between">
              <span>الجمعة</span>
              <span>مغلق</span>
            </div>
          </div>
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