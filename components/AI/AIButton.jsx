import React from 'react';
import { motion } from 'framer-motion';

const AIButton = ({ onClick, className = '' }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${className}`}
    >
      <img src="/icons/robot.png" alt="AI" className="w-6 h-6" />  {/* ✅ نفس حجم الأيقونات الأخرى */}
    </motion.button>
  );
};

export default AIButton;