// pages/cart.jsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useCartStore from "../utils/cartStore";

export default function CartPage() {

  const router = useRouter();
  const { items, removeFromCart, clearCart, getTotalPrice } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const STORE_WHATSAPP = "212663319599";

  // توليد السيريال
  const generateSerial = (imageName) => {

    if (!imageName) return "unknown";

    const parts = imageName.split("_");

    if (parts.length < 4) return "unknown";

    const faction = parts[0];
    const age = parts[1];
    const price = parts[2];
    const serialNum = parts[3];

    const factionLetter =
      faction === "boy" ? "B" :
      faction === "girls" ? "G" : "S";

    const paddedSerial = String(serialNum).padStart(4, "0");

    return `${factionLetter}${age}${price}D${paddedSerial}`;
  };

  // استخراج تفاصيل المنتج
  const getProductDetails = (product) => {

    const imageName = product.image?.split("/").pop()?.split(".")[0] || "";

    const parts = imageName.split("_");

    const productType = parts[0];

    let title = "";
    let genderIcon = "";
    let categoryText = "";
    let categoryIcon = "";

    if (productType === "sets") {

      const gender = parts[1] || "boy";
      const age = Number(parts[2]) || 2;

      const genderText = gender === "boy" ? "ولد" : "بنت";

      title = `طقم ${genderText} ${age}-${age - 1} سنوات`;

      genderIcon = "🛍️";
      categoryText = "أطقم";
      categoryIcon = "/icons/star.png";

    } else {

      const gender = productType;
      const age = Number(parts[1]) || 0;

      const genderText = gender === "boy" ? "ولد" : "بنت";

      title = `${genderText} ${age}-${age - 1} سنوات`;

      genderIcon = gender === "boy" ? "👦" : "👧";

      const price = Number(parts[2]) || product.price;

      if (price >= 25 && price <= 40) {

        categoryText = "اقتصادي";
        categoryIcon = "/icons/eco.png";

      } else if (price >= 45 && price <= 60) {

        categoryText = "ممتاز";
        categoryIcon = "/icons/star.png";

      } else {

        categoryText = "عادي";
        categoryIcon = "/icons/star.png";

      }

    }

    const serial = generateSerial(imageName);

    return { title, genderIcon, categoryText, categoryIcon, serial };
  };

  // إرسال الطلب
  const handleWhatsApp = async () => {

    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const total = getTotalPrice();

    const orderItems = items.map((item) => {

      const { title, genderIcon, categoryText, serial } =
        getProductDetails(item);

      return {
        serial,
        title,
        genderIcon,
        category: categoryText,
        price: item.price,
        quantity: item.quantity || 1,
        productUrl: `${window.location.origin}/product/${item.id}`,
        imageUrl: item.image
      };

    });

    try {

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: orderItems,
          total,
          phone: ""
        })
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        throw new Error("الرد من الخادم غير صالح");
      }

      if (!response.ok) {
        throw new Error(result.message || "فشل إرسال الطلب");
      }

      console.log("تم إرسال الطلب:", result);

      // رسالة واتساب
      let message = "🛍️ *طلب جديد من مامتي*\n\n";
      message += "━━━━━━━━━━━━━━━\n\n";

      orderItems.forEach((item, index) => {

        message += `*المنتج ${index + 1}:*\n`;
        message += `${item.genderIcon} ${item.title}\n`;
        message += `🏷️ التصنيف: ${item.category}\n`;
        message += `💰 السعر: ${item.price} درهم\n`;
        message += `🔢 الكمية: ${item.quantity}\n`;
        message += `🆔 السيريال: ${item.serial}\n`;
        message += `🔗 الرابط: ${item.productUrl}\n\n`;

      });

      message += "━━━━━━━━━━━━━━━\n";
      message += `*المجموع:* ${total} درهم\n\n`;
      message += "🌐 mamaty.ma";

      window.open(
        `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

    } catch (error) {

      console.error("خطأ:", error);

      setErrorMessage(
        error.message || "حدث خطأ أثناء إرسال الطلب"
      );

    } finally {

      setIsSubmitting(false);

    }

  };

  if (items.length === 0) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white p-4">

        <div className="text-center py-12">

          <span className="text-8xl mb-4 block opacity-30">🛒</span>

          <p className="text-gray-500 text-lg mb-4">
            سلة التسوق فارغة
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-[#FF8A5C] text-white px-6 py-3 rounded-xl"
          >
            تسوق الآن
          </button>

        </div>

      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F5] to-white p-4 pb-28">

      {/* رأس الصفحة */}
      <div className="flex items-center justify-between mb-6">

        <button onClick={() => router.back()} className="p-2">
          <img src="/icons/arrow-left.png" className="w-5 h-5"/>
        </button>

        <h1 className="text-xl font-bold">
          سلة المشتريات
        </h1>

        <button
          onClick={clearCart}
          className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded"
        >
          تفريغ السلة
        </button>

      </div>

      {/* المنتجات */}
      <div className="space-y-4">

        {items.map((item) => {

          const {
            title,
            genderIcon,
            categoryText,
            categoryIcon,
            serial
          } = getProductDetails(item);

          return (

            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-sm flex gap-3 items-center"
            >

              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              />

              <div className="flex-1 text-center">

                <h3
                  className="font-semibold cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {genderIcon} {title}
                </h3>

                <div className="flex justify-center gap-1 mt-1">
                  <img src={categoryIcon} className="w-4 h-4"/>
                  <span className="text-xs text-gray-600">
                    {categoryText}
                  </span>
                </div>

                <p className="text-blue-600 font-bold mt-1">
                  {item.price} درهم
                </p>

                <p className="text-xs text-gray-400">
                  السيريال: {serial}
                </p>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                🗑️
              </button>

            </div>

          );

        })}

      </div>

      {/* رسالة الخطأ */}
      {errorMessage && (
        <div className="text-red-500 text-center mt-3">
          {errorMessage}
        </div>
      )}

      {/* زر الطلب */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4">

        <div className="flex justify-between mb-3">
          <span>المجموع</span>
          <span className="text-xl font-bold text-blue-600">
            {getTotalPrice()} درهم
          </span>
        </div>

        <button
          onClick={handleWhatsApp}
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white py-3 rounded-xl"
        >
          {isSubmitting ? "جاري الإرسال..." : "اطلب عبر واتساب"}
        </button>

      </div>

    </div>
  );

}