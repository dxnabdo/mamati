import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../UI/Icon';
import Button from '../UI/Button';
import { useSound } from '../../hooks';
import { showToast } from '../../utils/toastMessages';

const AIChat = ({ isOpen, onClose, product = null }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const { playNotificationSound, playAddSound } = useSound();

  // اقتراحات سريعة
  const quickSuggestions = [
    { id: 1, text: 'اقتراح مقاسات', icon: '👕', action: 'sizes' },
    { id: 2, text: 'منتجات مشابهة', icon: '🎯', action: 'similar' },
    { id: 3, text: 'عروض خاصة', icon: '💰', action: 'offers' },
    { id: 4, text: 'مساعدة في الطلب', icon: '📦', action: 'help' },
    { id: 5, text: 'سياسة الإرجاع', icon: '🔄', action: 'return' },
    { id: 6, text: 'التوصيل', icon: '🚚', action: 'delivery' },
  ];

  // اقتراحات حسب المنتج
  const getProductSuggestions = () => {
    if (!product) return quickSuggestions;
    
    return [
      { id: 1, text: `مقاس مناسب لـ ${product.name}`, icon: '📏', action: 'size_fit' },
      { id: 2, text: 'منتجات مشابهة', icon: '👔', action: 'similar' },
      { id: 3, text: 'ألوان متوفرة', icon: '🎨', action: 'colors' },
      { id: 4, text: 'تقييمات العملاء', icon: '⭐', action: 'reviews' },
      { id: 5, text: 'معلومات عن الخامة', icon: '🧵', action: 'material' },
      { id: 6, text: 'العناية بالمنتج', icon: '🧼', action: 'care' },
    ];
  };

  // رسالة ترحيب
  const getWelcomeMessage = () => {
    if (product) {
      return {
        id: Date.now(),
        text: `مرحباً! أنا مساعد BAL-MA الذكي. هل تريد مساعدة في اختيار مقاس مناسب لـ ${product.name}؟ أو تريد اقتراحات مشابهة؟`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
    return {
      id: Date.now(),
      text: '👋 مرحباً بك في مساعد BAL-MA الذكي! كيف يمكنني مساعدتك اليوم؟ يمكنك اختيار أحد الاقتراحات أدناه أو كتابة سؤالك مباشرة.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
  };

  // تهيئة الدردشة
  useEffect(() => {
    if (isOpen) {
      setMessages([getWelcomeMessage()]);
      setSuggestions(product ? getProductSuggestions() : quickSuggestions);
      playNotificationSound();
    }
  }, [isOpen, product]);

  // التمرير لآخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // محاكاة رد الذكاء الاصطناعي
  const simulateAIResponse = (userMessage, action = null) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let responseType = 'text';
      let suggestions_update = [];

      // تحليل الرسالة
      const msg = userMessage.toLowerCase();
      const action_type = action || (msg.includes('مقاس') ? 'size' : 
                                    msg.includes('مشابه') ? 'similar' :
                                    msg.includes('سعر') ? 'price' :
                                    msg.includes('عرض') ? 'offers' :
                                    msg.includes('توصيل') ? 'delivery' :
                                    msg.includes('رجوع') ? 'return' : 'general');

      switch(action_type) {
        case 'size':
        case 'size_fit':
          if (product) {
            response = `للمنتج ${product.name}، المقاسات المتوفرة هي: ${
              product.faction === 'kids' || product.faction === 'boy' || product.faction === 'girls'
                ? '2, 4, 6, 8, 10, 12'
                : 'S, M, L, XL, XXL'
            }. هل تريد تجربة مقاس معين؟`;
            suggestions_update = [
              { id: 1, text: 'جرب مقاس S', icon: 'S', action: 'size_s' },
              { id: 2, text: 'جرب مقاس M', icon: 'M', action: 'size_m' },
              { id: 3, text: 'جرب مقاس L', icon: 'L', action: 'size_l' },
            ];
          } else {
            response = 'للمساعدة في اختيار المقاس، أخبرني هل تريد منتج للأطفال أم للكبار؟';
            suggestions_update = [
              { id: 1, text: '👕 أطفال', icon: '👕', action: 'kids' },
              { id: 2, text: '👔 كبار', icon: '👔', action: 'adults' },
            ];
          }
          break;

        case 'similar':
          response = 'بالتأكيد! لدي عدة اقتراحات لمنتجات مشابهة:\n\n• منتج بنفس الفئة\n• منتج بنفس السعر\n• منتج بنفس اللون\n\nهل تريد رؤيتها؟';
          suggestions_update = [
            { id: 1, text: 'عرض المنتجات المشابهة', icon: '👔', action: 'show_similar' },
            { id: 2, text: 'منتجات بنفس السعر', icon: '💰', action: 'same_price' },
          ];
          break;

        case 'price':
          response = product 
            ? `سعر ${product.name} هو ${product.price} درهم. يوجد أيضاً خصم 10% عند شراء قطعتين!`
            : 'الأسعار تبدأ من 20 درهم للأطفال و 60 درهم للنساء. هل تريد تصفية حسب السعر؟';
          break;

        case 'offers':
          response = '🔥 العروض الحالية:\n\n• خصم 20% على أول طلب\n• توصيل مجاني للطلبات فوق 200 درهم\n• عرض خاص: اشتري قطعتين واحصل على الثالثة مجاناً';
          break;

        case 'delivery':
          response = '🚚 معلومات التوصيل:\n\n• التوصيل مجاني داخل مراكش\n• مدة التوصيل: 2-3 أيام عمل\n• الدفع عند الاستلام متاح';
          break;

        case 'return':
          response = '🔄 سياسة الإرجاع:\n\n• يمكن إرجاع المنتج خلال 7 أيام\n• يجب أن يكون المنتج بحالته الأصلية\n• استرجاع المبلغ خلال 5 أيام عمل';
          break;

        default:
          response = 'شكراً لسؤالك! هل يمكنك توضيح أكثر؟ أو يمكنك اختيار أحد الاقتراحات السريعة.';
      }

      const aiMessage = {
        id: Date.now(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        type: responseType
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (suggestions_update.length > 0) {
        setSuggestions(suggestions_update);
      } else {
        setSuggestions(product ? getProductSuggestions() : quickSuggestions);
      }
      
      setIsTyping(false);
      playNotificationSound();
    }, 1500);
  };

  // إرسال رسالة
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    playAddSound();
    simulateAIResponse(inputText);
  };

  // اختيار اقتراح
  const handleSuggestionClick = (suggestion) => {
    const userMessage = {
      id: Date.now(),
      text: suggestion.text,
      sender: 'user',
      timestamp: new Date(),
      type: 'suggestion'
    };
    
    setMessages(prev => [...prev, userMessage]);
    playAddSound();
    simulateAIResponse(suggestion.text, suggestion.action);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* خلفية داكنة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[1000]"
        onClick={onClose}
      />

      {/* نافذة الدردشة */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[1001] h-[80vh] flex flex-col"
      >
        {/* رأس النافذة */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-[#6A5ACD] to-[#8B5CF6] text-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="robot" size="lg" />
            </div>
            <div>
              <h3 className="font-bold">مساعد BAL-MA الذكي</h3>
              <p className="text-xs opacity-90">متصل • رد فوري</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Icon name="close" size="sm" />
          </button>
        </div>

        {/* منطقة الرسائل */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`
                  max-w-[80%] p-3 rounded-2xl shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-white text-gray-800 rounded-tr-none border border-gray-200' 
                    : 'bg-gradient-to-r from-[#6A5ACD] to-[#8B5CF6] text-white rounded-tl-none'
                  }
                `}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                <span className="text-[10px] opacity-70 mt-1 block text-left">
                  {new Date(msg.timestamp).toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}

          {/* مؤشر الكتابة */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <div className="bg-gradient-to-r from-[#6A5ACD] to-[#8B5CF6] text-white p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* اقتراحات سريعة */}
        {suggestions.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-500 mb-2">اقتراحات سريعة:</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {suggestions.map((sugg) => (
                <button
                  key={sugg.id}
                  onClick={() => handleSuggestionClick(sugg)}
                  className="flex-shrink-0 bg-gray-100 px-3 py-2 rounded-full text-sm hover:bg-[#6A5ACD] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>{sugg.icon}</span>
                  <span>{sugg.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* منطقة الإدخال */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#6A5ACD]"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                ${inputText.trim() 
                  ? 'bg-[#6A5ACD] text-white hover:bg-[#5A4ABD]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>

        {/* معلومات المنتج (إذا كان هناك منتج محدد) */}
        {product && (
          <div className="px-4 py-2 bg-[#6A5ACD]/10 border-t border-[#6A5ACD]/20">
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <span>💬 تتحدث عن:</span>
              <span className="font-bold">{product.name}</span>
              <span>-</span>
              <span className="text-[#6A5ACD] font-bold">{product.price} درهم</span>
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// زر فتح المساعد (نسخة مصغرة)
export const AIButton = ({ onClick, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  return (
    <button
      onClick={onClick}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-[#6A5ACD] rounded-full animate-ping opacity-20 group-hover:opacity-30" />
      <div className={`relative ${sizeClasses[size]} bg-gradient-to-r from-[#6A5ACD] to-[#8B5CF6] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
        <Icon name="robot" size={size === 'lg' ? 'lg' : 'md'} />
      </div>
    </button>
  );
};

// زر فتح المساعد (نسخة مع نص)
export const AIButtonWithText = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6A5ACD] to-[#8B5CF6] text-white rounded-full shadow-lg hover:shadow-xl transition-all ${className}`}
    >
      <Icon name="robot" size="sm" />
      <span className="text-sm font-medium">المساعد الذكي</span>
    </button>
  );
};

export default AIChat;