// components/AI/AIChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const listeningTimeoutRef = useRef(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Load chat history
  useEffect(() => {
    const saved = localStorage.getItem("ai-chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("ai-chat", JSON.stringify(messages));
  }, [messages]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (listeningTimeoutRef.current) clearTimeout(listeningTimeoutRef.current);
    };
  }, []);

  // Voice input
  useEffect(() => {
    if (transcript) setInputValue(transcript);
  }, [transcript]);

  // Reset when open and add welcome message if empty
  useEffect(() => {
    if (isOpen) {
      resetTranscript();
      if (listening) SpeechRecognition.stopListening();
      
      // Add welcome message if no messages exist
      if (messages.length === 0) {
        const welcomeMessage = "✨ مرحباً بك في مساعد مامتي الذكي! ✨\n\nاسألني عن:\n• منتجات الأطقم\n• ملابس الأطفال (أولاد وبنات)\n• المنتجات المتنوعة في مامتي ماركيت\n\nأنا هنا لمساعدتك! 🛍️";
        setMessages([{ sender: "ai", text: welcomeMessage }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  const autoStopListening = () => {
    if (listeningTimeoutRef.current) clearTimeout(listeningTimeoutRef.current);
    listeningTimeoutRef.current = setTimeout(() => {
      if (listening) SpeechRecognition.stopListening();
    }, 5000);
  };

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("المتصفح لا يدعم الإدخال الصوتي");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      clearTimeout(listeningTimeoutRef.current);
    } else {
      SpeechRecognition.startListening({ language: "ar-MA" });
      autoStopListening();
    }
  };

  const stopListening = () => {
    if (listening) SpeechRecognition.stopListening();
    if (listeningTimeoutRef.current) clearTimeout(listeningTimeoutRef.current);
  };

  const typeEffect = (text) => {
    let i = 0;
    setTypingText("");

    const interval = setInterval(() => {
      setTypingText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || loading) return;

    stopListening();

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInputValue("");
    resetTranscript();
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai-tail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const reply = data.response || "لم أتمكن من الرد";

      typeEffect(reply);

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
        setTypingText("");
      }, reply.length * 15);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى." }]);
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
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:w-96 max-h-[90vh] rounded-t-2xl sm:rounded-2xl p-4 flex flex-col shadow-xl"
        >
          {/* رأس المودال مع أيقونة Generative */}
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src="/icons/generative.png" alt="Generative AI" className="w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-800">مساعد مامتي الذكي 🤖</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl leading-5">✕</button>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-2 min-h-[200px] max-h-[50vh]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${msg.sender === "user" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typingText && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  {typingText}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* حقل الإدخال مع زر الميكروفون */}
          <div className="flex gap-2 border-t pt-2">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows={1}
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
}