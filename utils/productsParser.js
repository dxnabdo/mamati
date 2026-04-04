// utils/productsParser.js

/**
 * تحليل اسم الصورة للمنتجات العادية (أولاد، بنات، أطقم)
 * الصيغ المدعومة:
 * - 4 أجزاء: faction_size_price_serial.png   (مثال: boy_2_25_1.png)
 * - 5 أجزاء للأطقم: sets_gender_age_price_serial.png   (مثال: sets_boy_2_80_1.png)
 */
export function parseImageFilename(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const parts = nameWithoutExt.split("_");

  // صيغة الأطقم المكونة من 5 أجزاء
  if (parts[0] === "sets" && parts.length === 5) {
    const [faction, gender, size, price, serial] = parts;
    return {
      faction: "sets",
      gender,
      size,
      price: parseInt(price),
      serial: parseInt(serial),
      fullName: nameWithoutExt,
    };
  }

  // الصيغة العادية المكونة من 4 أجزاء
  if (parts.length === 4) {
    const [faction, size, price, serial] = parts;
    const validFactions = ["boy", "girls", "women", "sets"];
    if (!validFactions.includes(faction)) {
      console.warn("⚠️ فئة غير معروفة:", faction, filename);
      return null;
    }
    return {
      faction,
      size,
      price: parseInt(price),
      serial: parseInt(serial),
      fullName: nameWithoutExt,
    };
  }

  console.warn("⚠️ اسم صورة غير صالح:", filename);
  return null;
}

/**
 * تحليل اسم الصورة لمنتجات مامتي ماركيت
 * الصيغ المدعومة:
 * - type_size_price_serial.jpg   (مثال: tshirt_xl_120_1.jpg)
 * - type_price_serial.jpg        (مثال: bag_150_1.jpg)
 */
export function parseMarketFilename(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const parts = nameWithoutExt.split("_");

  if (parts.length < 3) {
    console.warn("⚠️ اسم صورة ماركيت غير صالح:", filename);
    return null;
  }

  let type, size = null, price, serial;
  if (parts.length === 3) {
    [type, price, serial] = parts;
  } else if (parts.length >= 4) {
    [type, size, price, serial] = parts;
  } else {
    return null;
  }

  return {
    faction: "market",
    type,
    size: size || "",
    price: parseInt(price),
    serial: parseInt(serial),
    fullName: nameWithoutExt,
  };
}

/**
 * تحديد نوع الفئة للمنتجات العادية فقط
 * اقتصادي: 25 → 40
 * ممتاز: 45 → 60
 * أطقم: faction = sets
 */
export function getCategoryType(product) {
  if (product.faction === "sets") return "sets";
  if (product.price >= 25 && product.price <= 40) return "economy";
  if (product.price >= 45 && product.price <= 60) return "premium";
  return "economy";
}

/**
 * أيقونة الفئة للمنتجات العادية
 */
export function getCategoryIcon(product) {
  const type = getCategoryType(product);
  if (type === "premium") return "⭐";
  if (type === "economy") return "💰";
  if (type === "sets") return "✨";
  return "👕";
}

/**
 * اسم الفئة بالعربية للمنتجات العادية
 */
export function getCategoryName(product) {
  const type = getCategoryType(product);
  switch (product.faction) {
    case "boy":
      return type === "premium" ? "أولاد ممتاز" : "أولاد اقتصادي";
    case "girls":
      return type === "premium" ? "بنات ممتاز" : "بنات اقتصادي";
    case "women":
      return type === "premium" ? "نساء ممتاز" : "نساء اقتصادي";
    case "sets":
      return "أطقم";
    default:
      return "منتج";
  }
}

/**
 * جلب جميع المنتجات عبر API (للاستخدام في الصفحات)
 */
export async function getAllProducts() {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("❌ خطأ تحميل المنتجات:", error);
    return [];
  }
}

/**
 * جلب منتجات مامتي ماركيت فقط عبر API
 */
export async function getAllMarketProducts() {
  try {
    const response = await fetch("/api/products?market=true");
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("❌ خطأ تحميل منتجات الماركت:", error);
    return [];
  }
}

/**
 * منتجات حسب الفئة (للاستخدام في API)
 */
export async function getProductsByCategory(categoryId) {
  try {
    const response = await fetch(`/api/products?category=${categoryId}`);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("❌ خطأ تحميل الفئة:", error);
    return [];
  }
}

/**
 * احصائيات المنتجات
 */
export async function getProductsStats() {
  try {
    const response = await fetch("/api/products?stats=true");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ خطأ الإحصائيات:", error);
    return {};
  }
}

/**
 * منتج واحد
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`/api/products?id=${id}`);
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("❌ خطأ تحميل المنتج:", error);
    return null;
  }
}

/**
 * التصدير
 */
export default {
  parseImageFilename,
  parseMarketFilename,
  getCategoryType,
  getCategoryIcon,
  getCategoryName,
  getAllProducts,
  getAllMarketProducts,
  getProductsByCategory,
  getProductsStats,
  getProductById,
};