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

  // Reset when open
  useEffect(() => {
    if (isOpen) {
      resetTranscript();
      if (listening) SpeechRecognition.stopListening();
    }
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
      setMessages((prev) => [...prev, { sender: "ai", text: "خطأ في الاتصال" }]);
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
          <div className="flex justify-between items-center mb-2 pb-2 border-b">
            <h2 className="font-bold">🤖 مساعد المتجر</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mb-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="px-3 py-2 rounded-lg bg-gray-100 max-w-[80%]">
                  {msg.text}
                </div>
              </div>
            ))}

            {typingText && (
              <div className="bg-gray-200 p-2 rounded">
                {typingText}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 border-t pt-2">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="اكتب..."
              className="flex-1 border rounded-lg px-2 py-1"
            />

            <button onClick={startListening}>
              🎙️
            </button>

            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-orange-500 text-white px-3 rounded"
            >
              إرسال
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
