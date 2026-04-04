// utils/openaiClient.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // ضع مفتاحك في .env.local
});

export default openai;