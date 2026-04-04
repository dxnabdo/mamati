import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Instructions() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);

  // خطوات استخدام المتجر
  const steps = [
    {
      id: 1,
      title: 'تصفح المنتجات',
      description: 'استعرضي مجموعتنا الواسعة من ملابس الأطفال المستعملة بحالة ممتازة. يمكنك التصفية حسب الفئة (أولاد/بنات) أو العمر أو السعر.',
      icon: '🔍',
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'أضف إلى السلة',
      description: 'عند إعجابك بقطعة، اضغط على زر "أضف للسلة". المنتج سيُحجز لك لمدة 20 دقيقة لإتاحة الفرصة لإكمال الطلب.',
      icon: '🛒',
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 3,
      title: 'راجع السلة',
      description: 'اذهبي إلى السلة لمشاهدة المنتجات المختارة. يمكنك حذف أي منتج أو تعديل الكمية (إذا كان متاحاً).',
      icon: '📋',
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      id: 4,
      title: 'أكمل الطلب عبر واتساب',
      description: 'بعد التأكد من اختياراتك، اضغطي على "اطلب الآن عبر واتساب". سيتم تحويلك إلى واتساب مع رسالة جاهزة تحتوي على تفاصيل طلبك.',
      icon: '💬',
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 5,
      title: 'استخدمي الذكاء الاصطناعي',
      description: 'جربي زر AI في الشريط السفلي لمساعدتك في اختيار الأطقم المتناسقة أو الحصول على اقتراحات.',
      icon: '🤖',
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  // الأسئلة الشائعة المختصرة
  const faqs = [
    {
      q: 'هل يمكنني استبدال المنتج؟',
      a: 'نعم، يمكن استبدال المنتج خلال 7 أيام من الاستلام، بشرط أن يكون بحالته الأصلية مع العلامة.'
    },
    {
      q: 'ما هي مدة التوصيل؟',
      a: 'التوصيل يستغرق 2-3 أيام عمل داخل مراكش.'
    },
    {
      q: 'هل يوجد حد أدنى للطلب؟',
      a: 'لا، يمكنك الطلب بقطعة واحدة فقط.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white pb-20">
      {/* الهيدر */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <img src="/icons/arrow-left.png" alt="رجوع" className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">كيفية استخدام مامتي</h1>
          <Link href="/">
            <img src="/mamaty-logo.png" alt="مامتي" className="h-8 w-auto" />
          </Link>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="p-4 space-y-6">
        {/* مقدمة */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <span className="text-6xl mb-2 block">👋</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">مرحباً بك في مامتي!</h2>
          <p className="text-gray-600">
            إليك دليل سريع لمساعدتك على استخدام المتجر بكل سهولة.
          </p>
        </div>

        {/* خطوات الاستخدام (كروت) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-700 border-r-4 border-[#FF8A5C] pr-3 py-1">
            خطوات بسيطة للتسوق
          </h3>
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.id * 0.1 }}
              className={`${step.color} rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm ${step.textColor}`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg ${step.textColor}`}>{step.title}</h4>
                  <p className="text-gray-700 mt-1 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* نصائح مهمة */}
        <div className="bg-[#FF8A5C] text-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span>💡</span> نصائح ذهبية
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-white text-lg">•</span>
              <span>المنتجات في السلة محجوزة لمدة 20 دقيقة فقط – أسرعي بالطلب!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white text-lg">•</span>
              <span>يمكنك حفظ المنتجات في المفضلة للعودة إليها لاحقاً.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white text-lg">•</span>
              <span>استخدمي زر AI في الأسفل للحصول على اقتراحات تنسيق.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white text-lg">•</span>
              <span>التوصيل مجاني للطلبات فوق 200 درهم.</span>
            </li>
          </ul>
        </div>

        {/* أسئلة سريعة */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-700">أسئلة شائعة</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="font-bold text-gray-800 mb-1">{faq.q}</p>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* زر الاتصال بنا */}
        <Link href="/contact">
          <button className="w-full bg-[#FF8A5C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#E67A4F] transition-colors shadow-md">
            تواصل معنا للمساعدة
          </button>
        </Link>
      </div>
    </div>
  );
}