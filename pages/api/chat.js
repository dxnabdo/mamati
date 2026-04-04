import OpenAI from "openai";
import products from "../../data/products.json";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function extractFilters(message) {
  const ageMatch = message.match(/\b(\d{1,2})\s*(سنة|ans|year)\b/i);
  const priceMatch = message.match(/\b(\d{1,5})\s*(درهم|dh|€)?\b/i);
  const sizeMatch = message.match(/\b(\d{1,3})\b/);

  let category = null;
  if (/حذاء|chaussure|shoe/i.test(message)) category = "أحذية";
  else if (/شنطة|sac|bag/i.test(message)) category = "شنط";
  else if (/ملابس أطفال|vetement enfant/i.test(message)) category = "ملابس أطفال";
  else category = "متنوعة";

  return {
    age: ageMatch ? parseInt(ageMatch[1]) : null,
    price: priceMatch ? parseInt(priceMatch[1]) : null,
    size: sizeMatch ? parseInt(sizeMatch[1]) : null,
    category,
  };
}

export default async function handler(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    const filters = extractFilters(message);

    let matchedProducts = products.filter((p) => {
      let match = true;
      if (filters.age) match = match && p.age === filters.age;
      if (filters.price) match = match && p.price <= filters.price;
      if (filters.size) match = match && p.size === filters.size;
      if (filters.category && filters.category !== "متنوعة") match = match && p.category === filters.category;
      return match;
    });

    if (matchedProducts.length === 0) matchedProducts = products.slice(0, 5);

    const productListHTML = matchedProducts.map(p => `
      <div style="border:1px solid #ddd; padding:8px; margin:4px; width:180px;">
        <img src="${p.image}" style="width:100%; height:150px; object-fit:cover;" />
        <h4>${p.name}</h4>
        <p>${p.brand} - ${p.price} درهم</p>
        <a href="${p.url}"><button style="background:#f0c040; padding:5px; border:none;">أضف للسلة</button></a>
      </div>
    `).join("");

    const systemPrompt = `
أنت مساعد متجر "مامتي".
المتجر يبيع ملابس أطفال أوروبية مستعملة + ماركت بلايس.
اقترح المنتجات التالية بطريقة ودية وبصياغة HTML جاهزة للعرض Grid:
${productListHTML}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}