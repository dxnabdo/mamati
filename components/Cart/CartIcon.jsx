import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useCartStore from '../../utils/cartStore';

const CartIcon = ({ variant = 'main' }) => {
  const { getItemCount } = useCartStore();
  const count = getItemCount();

  const getIconName = () => {
    if (variant === 'main') return count > 0 ? 'cart-main-active' : 'cart-main';
    else return count > 0 ? 'cart-bottom-active' : 'cart-bottom';
  };

  return (
    <Link href="/cart" className="relative inline-block">
      <motion.div whileTap={{ scale: 0.9 }} className="cursor-pointer">
        <img src={`/icons/${variant === 'main' ? 'main-header' : 'bottom-bar'}/${getIconName()}.png`} alt="السلة" className="w-6 h-6" />
        {count > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-[#FF8A5C] text-white text-xs font-bold min-w-[18px] h-4 rounded-full flex items-center justify-center px-1">
            {count}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export default CartIcon;