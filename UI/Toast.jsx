import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

// مكون رسالة Toast منبثقة
const Toast = ({ 
  message, 
  type = 'success', 
  duration = 2000, 
  onClose,
  icon = null 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // ألوان حسب نوع الرسالة
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  // أيقونات افتراضية حسب النوع
  const defaultIcons = {
    success: 'check',
    error: 'close',
    warning: 'alert',
    info: 'info',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`
            fixed bottom-20 left-1/2 transform -translate-x-1/2
            ${typeStyles[type]} text-white px-4 py-3 rounded-full
            shadow-lg z-50 flex items-center gap-3
            min-w-[200px] justify-center
          `}
        >
          {icon ? (
            <Icon name={icon} size="sm" />
          ) : (
            <span className="text-lg">
              {type === 'success' && '✅'}
              {type === 'error' && '❌'}
              {type === 'warning' && '⚠️'}
              {type === 'info' && 'ℹ️'}
            </span>
          )}
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// مدير الـ Toast (للتحكم بالرسائل من أي مكان)
export const toastManager = {
  show: (message, type = 'success', duration = 2000) => {
    const event = new CustomEvent('show-toast', { 
      detail: { message, type, duration } 
    });
    window.dispatchEvent(event);
  },
  
  success: (message, duration = 2000) => {
    toastManager.show(message, 'success', duration);
  },
  
  error: (message, duration = 2000) => {
    toastManager.show(message, 'error', duration);
  },
  
  warning: (message, duration = 2000) => {
    toastManager.show(message, 'warning', duration);
  },
  
  info: (message, duration = 2000) => {
    toastManager.show(message, 'info', duration);
  },
};

// مكون الحاوية للـ Toast
export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleShowToast = (event) => {
      const { message, type, duration } = event.detail;
      const id = Date.now();
      
      setToasts(prev => [...prev, { id, message, type, duration }]);
      
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  return (
    <div className="fixed bottom-20 left-0 right-0 pointer-events-none z-50">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => {}}
        />
      ))}
    </div>
  );
};

export default Toast;