// pages/api/ai-tail.js
import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { parseImageFilename, parseMarketFilename } from "../../utils/productsParser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // قراءة المنتجات مباشرة من نظام الملفات (بدون fetch)
    const allProducts = getAllProductsDirectly();
    const mamatiProducts = allProducts.filter(p => p.isMamatiMarket).slice(0, 8);

    const productsContext = mamatiProducts.map(p => {
      const productName = p.title || p.name || p.displayName || 'منتج';
      return `• ${productName} - السعر: ${p.price} درهم`;
    }).join("\n");

    const systemMessage = {
      role: "system",
      content: `
أنت مساعد ذكي لمتجر مامتي الإلكتروني.  
يمكنك الإجابة على أسئلة المستخدم حول المنتجات، الأسعار، الأقسام، العروض أو نصائح التسوق.  
إذا طلب المستخدم اقتراح منتجات، اختر فقط ما يناسب سؤاله من المنتجات المتوفرة.  
قائمة ببعض المنتجات المتوفرة حالياً (كمرجع فقط):  
${productsContext}
رد بطريقة ودية ومختصرة، ولا تكرر قائمة المنتجات نفسها.
      `
    };

    const finalMessages = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      temperature: 0.8,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;
    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error("❌ AI Tail Error:", error);
    // معالجة خطأ تجاوز الحصة (quota)
    if (error.code === 'insufficient_quota' || error.status === 429) {
      return res.status(200).json({ 
        response: "عذراً، خدمة الذكاء الاصطناعي غير متاحة حالياً بسبب تجاوز الحصة. يرجى المحاولة لاحقاً." 
      });
    }
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
}

/**
 * دالة لقراءة جميع المنتجات مباشرة من نظام الملفات (للاستخدام في الخادم)
 * تعيد مصفوفة تحتوي على المنتجات العادية ومنتجات الماركت مع خاصية isMamatiMarket
 */
function getAllProductsDirectly() {
  const regularDir = path.join(process.cwd(), 'public/BAL-MA-PR');
  const marketDir = path.join(process.cwd(), 'public/BAL-MA-MARKET');
  let products = [];

  // قراءة المنتجات العادية (BAL-MA-PR)
  if (fs.existsSync(regularDir)) {
    const files = fs.readdirSync(regularDir);
    files.forEach(file => {
      if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
      const info = parseImageFilename(file);
      if (info) {
        products.push({
          id: file,
          ...info,
          image: `/BAL-MA-PR/${file}`,
          isMamatiMarket: false,
        });
      }
    });
  }

  // قراءة منتجات مامتي ماركيت (BAL-MA-MARKET)
  if (fs.existsSync(marketDir)) {
    const files = fs.readdirSync(marketDir);
    files.forEach(file => {
      if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
      const info = parseMarketFilename(file);
      if (info) {
        products.push({
          id: file,
          ...info,
          image: `/BAL-MA-MARKET/${file}`,
          isMamatiMarket: true,
        });
      } else {
        console.warn("⚠️ اسم ماركت غير صالح:", file);
      }
    });
  }

  return products;
}