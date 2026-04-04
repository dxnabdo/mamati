// pages/api/products.js
import fs from 'fs';
import path from 'path';

// دالة لتحليل أسماء ملفات مامتي ماركيت
function parseMarketFilename(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const parts = nameWithoutExt.split("_");
  if (parts.length < 3) return null;
  let type, size = null, price, serial;
  if (parts.length === 3) {
    [type, price, serial] = parts;
  } else if (parts.length >= 4) {
    [type, size, price, serial] = parts;
  } else {
    return null;
  }
  return {
    type,
    size: size || "",
    price: parseInt(price),
    serial: parseInt(serial),
  };
}

export default function handler(req, res) {
  const regularDir = path.join(process.cwd(), "public", "BAL-MA-PR");
  const marketDir = path.join(process.cwd(), "public", "BAL-MA-MARKET");
  const products = [];

  // 1. قراءة المنتجات العادية (BAL-MA-PR)
  if (fs.existsSync(regularDir)) {
    const files = fs.readdirSync(regularDir);
    files.forEach((file) => {
      if (!/\.(jpg|jpeg|png)$/i.test(file)) return;

      const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
      const parts = nameWithoutExt.split("_");

      // صيغة الأطقم (5 أجزاء)
      if (parts[0] === "sets" && parts.length === 5) {
        const [faction, gender, size, price, serial] = parts;
        const priceNumber = parseInt(price);

        products.push({
          id: file,
          image: `/BAL-MA-PR/${file}`,
          faction: "sets",
          gender: gender,
          size: size,
          price: priceNumber,
          serial: parseInt(serial),
          type: "sets",
          category: "sets",
          name: gender === "boy" ? "أطقم أولاد" : "أطقم بنات",
          displayName: `${priceNumber} درهم`,
          isMamatiMarket: false,
        });
      }
      // صيغة المنتجات العادية (4 أجزاء)
      else if (parts.length === 4) {
        const [faction, size, price, serial] = parts;
        const priceNumber = parseInt(price);

        let type = "economy";
        if (priceNumber >= 45) type = "premium";

        let name = "منتج";
        if (faction === "boy") name = "أولاد";
        else if (faction === "girls") name = "بنات";

        products.push({
          id: file,
          image: `/BAL-MA-PR/${file}`,
          faction: faction,
          size: size,
          price: priceNumber,
          serial: parseInt(serial),
          type: type,
          category: `${faction}-${type}`,
          name: name,
          displayName: `${priceNumber} درهم`,
          isMamatiMarket: false,
        });
      }
    });
  }

  // 2. قراءة منتجات مامتي ماركيت (BAL-MA-MARKET)
  if (fs.existsSync(marketDir)) {
    const marketFiles = fs.readdirSync(marketDir);
    marketFiles.forEach((file) => {
      if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
      const info = parseMarketFilename(file);
      if (!info) return;

      products.push({
        id: file,
        image: `/BAL-MA-MARKET/${file}`,
        faction: "market",
        type: info.type,
        size: info.size,
        price: info.price,
        serial: info.serial,
        category: "mamati-market",
        name: `${info.type}${info.size ? ` ${info.size}` : ''}`,
        displayName: `${info.price} درهم`,
        isMamatiMarket: true,
      });
    });
  }

  // 3. معالجة الاستعلامات
  const { market, category, id, stats } = req.query;

  let filtered = products;

  if (market === 'true') {
    filtered = filtered.filter(p => p.isMamatiMarket);
  }
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (id) {
    const product = filtered.find(p => p.id === id);
    return res.status(200).json(product || null);
  }
  if (stats) {
    const statsData = {
      total: products.length,
      regular: products.filter(p => !p.isMamatiMarket).length,
      market: products.filter(p => p.isMamatiMarket).length,
    };
    return res.status(200).json(statsData);
  }

  res.status(200).json({ products: filtered });
}