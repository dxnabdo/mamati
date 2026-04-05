// components/AI/AIChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const AIChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // إعدادات التعرف على الصوت
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // تحديث حقل الإدخال بالنص المسموع
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  // إعادة ضبط المحادثة عند فتح المودال
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setInputValue("");
      resetTranscript();
    }
  }, [isOpen, resetTranscript]);

  // التمرير التلقائي إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, { sender: "user", text }]);
    setInputValue("");
    resetTranscript(); // مسح النص الصوتي بعد الإرسال
    setLoading(true);

    try {
      const apiMessages = messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));
      apiMessages.push(userMessage);

      const response = await fetch("/api/ai-tail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json();
      if (data.response) {
        setMessages(prev => [...prev, { sender: "ai", text: data.response }]);
      } else {
        setMessages(prev => [...prev, { sender: "ai", text: "عذرًا، لم أتمكن من الرد الآن." }]);
      }
    } catch (error) {
      console.error("AIChat Error:", error);
      setMessages(prev => [...prev, { sender: "ai", text: "حدث خطأ في الاتصال بالخادم. حاول مرة أخرى." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: false, language: "ar" });
    } else {
      alert("المتصفح لا يدعم الإدخال الصوتي. يُرجى استخدام Chrome أو Edge.");
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end sm:items-center"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:w-96 max-h-[90vh] rounded-t-2xl sm:rounded-2xl p-4 flex flex-col shadow-xl"
        >
          {/* الرأس */}
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-bold">مساعد مامتي 🤖</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl leading-5">✕</button>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-2 min-h-[200px] max-h-[50vh]">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-4">
                اسألني عن منتجات مامتي ماركيت، الأسعار، أو أي شيء يخص المتجر.
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* حقل الإدخال مع زر الميكروفون */}
          <div className="flex gap-2 border-t pt-2">
            <textarea
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              style={{ minHeight: '40px', maxHeight: '100px' }}
            />
            <button
              onClick={startListening}
              disabled={!browserSupportsSpeechRecognition}
              className={`p-2 rounded-lg ${listening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition`}
              title="إدخال صوتي"
            >
              🎙️
            </button>
            <button
              onClick={handleSendMessage}
              disabled={loading || !inputValue.trim()}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-300 transition"
            >
              {loading ? "..." : "إرسال"}
            </button>
          </div>
          {listening && (
            <div className="text-xs text-green-600 mt-1 text-center">
              ⏺️ جاري الاستماع... انقر الميكروفون مرة أخرى للإيقاف
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChatModal;