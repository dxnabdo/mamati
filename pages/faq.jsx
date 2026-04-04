import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../components/UI/Icon';
import Button from '../components/UI/Button';

export default function FAQ() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'كيف يمكنني الطلب؟',
      answer: 'يمكنك الطلب بإضافة المنتجات إلى السلة ثم الضغط على زر "إتمام الطلب". سيتم تحويلك إلى واتساب مع رسالة جاهزة تحتوي على تفاصيل طلبك.'
    },
    {
      question: 'ما هي مدة الحجز؟',
      answer: 'المنتجات في السلة محجوزة لمدة 20 دقيقة. بعد ذلك، تعود متاحة للجميع مرة أخرى.'
    },
    {
      question: 'هل التوصيل مجاني؟',
      answer: 'نعم، التوصيل مجاني لجميع الطلبات داخل مراكش. للطلبات أقل من 200 درهم، هناك رسوم توصيل بسيطة.'
    },
    {
      question: 'كيف يمكنني الدفع؟',
      answer: 'الدفع عند الاستلام متاح. يمكنك الدفع نقداً عند استلام الطلب.'
    },
    {
      question: 'هل يمكنني استبدال المنتج؟',
      answer: 'نعم، يمكنك استبدال المنتج خلال 7 أيام من الاستلام مع الاحتفاظ بالفاتورة والمنتج بحالته الأصلية.'
    },
    {
      question: 'كيف يعمل الذكاء الاصطناعي؟',
      answer: 'المساعد الذكي يمكنه اقتراح مقاسات مناسبة لك، وتوصية بمنتجات مشابهة، والإجابة على استفساراتك.'
    },
    {
      question: 'ماذا تعني الأيقونات ⭐ و 💰 و ✨؟',
      answer: '⭐ تعني منتج ممتاز (جودة عالية)، 💰 تعني منتج اقتصادي (سعر مناسب)، ✨ تعني أطقم (مجموعة متكاملة).'
    },
    {
      question: 'كيف أتواصل مع الدعم؟',
      answer: 'يمكنك التواصل معنا عبر واتساب من خلال زر الواتساب في الشريط السفلي، أو عبر وسائل التواصل الاجتماعي.'
    },
  ];

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
          <h1 className="text-xl font-bold">الأسئلة الشائعة</h1>
        </div>
      </div>

      {/* محتوى الأسئلة */}
      <div className="p-4 space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800">{faq.question}</span>
              <Icon 
                name={openIndex === index ? 'close' : 'add'} 
                size="xs" 
                className={`transition-transform ${openIndex === index ? 'rotate-45' : ''}`}
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100"
                >
                  <p className="p-4 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* قسم التواصل */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-[#FF4D8D] to-[#E63E7B] text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-bold mb-2">لم تجد إجابتك؟</h2>
          <p className="opacity-90 mb-4">تواصل معنا مباشرة عبر واتساب</p>
          <Button
            variant="whatsapp"
            onClick={() => window.open('https://wa.me/21266331959', '_blank')}
            className="mx-auto"
          >
            تواصل معنا
          </Button>
        </div>
      </div>
    </div>
  );
}