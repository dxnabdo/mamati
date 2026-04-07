// components/AI/AIChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Fix mic continuous issue
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  // Stop mic automatically after speaking
  useEffect(() => {
    if (listening) {
      const timeout = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [listening]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("المتصفح لا يدعم الميكروفون");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ language: "ar-MA", continuous: false });
    }
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-tail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.response || "لا يوجد رد" },
      ]);
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "خطأ" }]);
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
        className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end sm:items-center"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:w-96 max-h-[90vh] rounded-t-2xl sm:rounded-2xl p-4 flex flex-col shadow-2xl"
        >

          {/* Header (clean & professional) */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b">
            <div className="flex items-center gap-2">
              <img src="/generative.png" className="w-6 h-6" />
              <img src="/mamaty-logo.png" className="w-6 h-6" />
              <h2 className="font-bold text-gray-800">مساعدك الذكي</h2>
            </div>
            <button onClick={onClose}>✕</button>
          </div>

          {/* Short professional text */}
          <div className="text-xs text-gray-500 text-center mb-2">
            تسوق ذكي بسرعة وسهولة
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-xl max-w-[80%] text-sm ${msg.sender === "user" ? "bg-orange-100" : "bg-gray-100"}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-400">...</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t pt-2">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="اكتب..."
              className="flex-1 border rounded-lg px-3 py-2 resize-none text-sm"
            />

            <button
              onClick={startListening}
              className={`p-2 rounded-lg ${listening ? "bg-red-500 text-white" : "bg-gray-200"}`}
            >
              🎙️
            </button>

            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              إرسال
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
