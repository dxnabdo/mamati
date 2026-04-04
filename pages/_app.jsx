import '../styles/globals.css';
import PhoneRegisterPopup from "../components/PhoneRegisterPopup";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {/* نافذة التسجيل */}
      <PhoneRegisterPopup />

      {/* شريط تحميل علوي */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#FF8A5C] z-[10000] animate-pulse" />
      )}

      {/* محتوى الصفحة مع أنيميشن انتقال */}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
// utils/productsParser.js

// قائمة بجميع صور المنتجات في المجلد public/BAL-MA-PR/
// يمكنك تحديث هذه القائمة يدوياً عند إضافة صور جديدة،
// أو يمكنك جعلها ديناميكية باستخدام fs (في حال Next.js مع getStaticProps) لكن هذا المثال يستخدم قائمة ثابتة للبساطة.
const productImages = [
  'boy_2_25_1.png',
  'boy_4_45_2.png',
  'girls_3_20_1.png',
  'girls_5_35_2.png',
  'sets_boy_80_1.png',
  'sets_girl_120_2.png'
];

/**
 * يحلل اسم ملف الصورة ويستخرج البيانات منه.
 * @param {string} fileName - اسم الملف مثل 'boy_2_25_1.png'
 * @returns {Object} - بيانات المنتج المستخرجة
 */
const parseFileName = (fileName) => {
  const parts = fileName.replace('.png', '').split('_');
  const type = parts[0]; // 'boy', 'girls', 'sets'

  let faction, price, size;

  if (type === 'boy' || type === 'girls') {
    faction = type; // 'boy' أو 'girls'
    size = parseInt(parts[1], 10); // العمر (مثلاً 2)
    price = parseInt(parts[2], 10); // السعر (مثلاً 20)
  } else if (type === 'sets') {
    const subType = parts[1]; // 'boy' أو 'girls'
    faction = 'sets';
size = parseInt(parts[2], 10); // العمر (مثلاً 2)
    price = parseInt(parts[3], 10); // السعر (مثلاً 20)

  }

  // تحديد الفئة (اقتصادي/ممتاز) بناءً على السعر
  let category;
  if (price === 25 || price === 70) {
    category = 'eco';
  } else if (price === 45 || price === 80) {
    category = 'premium';
  } else {
    category = 'eco'; // قيمة افتراضية
  }

  return {
    faction,
    price,
    size,
    category
  };
};

/**
 * يجلب جميع المنتجات (من القائمة الثابتة).
 * يمكنك تعديل هذه الدالة لتصبح غير متزامنة إذا احتجت جلب بيانات من API أو ملف.
 * @returns {Array} - مصفوفة من المنتجات
 */
export const getAllProducts = async () => {
  // في حال أردت جلب الملفات ديناميكياً من المجلد، يمكنك استخدام fs و path في بيئة Node.
  // لكن هنا نستخدم القائمة الثابتة.
  return productImages.map((fileName, index) => {
    const parsed = parseFileName(fileName);
    return {
      id: index + 1,
      name: fileName.replace('.png', ''), // اسم بدون امتداد
      image: `/BAL-MA-PR/${fileName}`,
      ...parsed
    };
  });
};

/**
 * مثال لوظيفة إضافية: جلب المنتجات حسب الفئة والجنس.
 * @param {string} categoryId - معرف الفئة مثل 'boys-economy'
 * @param {Array} allProducts - مصفوفة جميع المنتجات
 * @returns {Array} - المنتجات المطابقة
 */
export const getProductsByCategory = (categoryId, allProducts) => {
  // يمكنك تنفيذ التصفية هنا إذا أردت، لكن التصفية موجودة في الصفحة الرئيسية حالياً.
  // هذه الدالة اختيارية.
};
