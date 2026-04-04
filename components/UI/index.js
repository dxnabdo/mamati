// تصدير جميع مكونات UI
export { default as Icon } from './Icon';
export { default as Button, PrimaryButton, SecondaryButton, WhatsAppButton, AIButton, DangerButton } from './Button';
export { default as Toast, ToastContainer, toastManager } from './Toast';
export { default as DrawerMenu, MenuButton } from './DrawerMenu';

// تصدير كحزمة واحدة
const UI = {
  Icon,
  Button,
  PrimaryButton,
  SecondaryButton,
  WhatsAppButton,
  AIButton,
  DangerButton,
  Toast,
  ToastContainer,
  toastManager,
  DrawerMenu,
  MenuButton,
};

export default UI;