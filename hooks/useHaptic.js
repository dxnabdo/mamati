import { useCallback } from 'react';

// هوك للتحكم في الاهتزاز
const useHaptic = () => {
  
  // التحقق من دعم الاهتزاز في المتصفح
  const isHapticSupported = typeof window !== 'undefined' && 'vibrate' in navigator;

  /**
   * تشغيل اهتزاز بمدة محددة
   * @param {number} duration - مدة الاهتزاز بالملي ثانية
   */
  const vibrate = useCallback((duration = 30) => {
    if (isHapticSupported) {
      navigator.vibrate(duration);
    }
  }, [isHapticSupported]);

  /**
   * اهتزاز قصير (للأزرار العادية)
   */
  const lightTap = useCallback(() => {
    vibrate(15);
  }, [vibrate]);

  /**
   * اهتزاز متوسط (لإضافة للسلة)
   */
  const mediumTap = useCallback(() => {
    vibrate(30);
  }, [vibrate]);

  /**
   * اهتزاز طويل (للأخطاء)
   */
  const heavyTap = useCallback(() => {
    vibrate(50);
  }, [vibrate]);

  /**
   * اهتزاز مزدوج (للتأكيد)
   */
  const doubleTap = useCallback(() => {
    if (isHapticSupported) {
      navigator.vibrate([30, 100, 30]);
    }
  }, [isHapticSupported]);

  /**
   * اهتزاز متقطع (للإشعارات المهمة)
   */
  const notificationTap = useCallback(() => {
    if (isHapticSupported) {
      navigator.vibrate([50, 100, 50, 100, 50]);
    }
  }, [isHapticSupported]);

  /**
   * اهتزاز حسب نوع الحدث
   * @param {string} type - نوع الحدث (add, remove, success, error, notification)
   */
  const hapticFeedback = useCallback((type = 'click') => {
    switch(type) {
      case 'add':
      case 'favorite':
        mediumTap();
        break;
      case 'remove':
        lightTap();
        break;
      case 'success':
      case 'order':
        doubleTap();
        break;
      case 'error':
        heavyTap();
        break;
      case 'notification':
        notificationTap();
        break;
      default:
        lightTap();
    }
  }, [lightTap, mediumTap, heavyTap, doubleTap, notificationTap]);

  /**
   * إيقاف أي اهتزاز قيد التشغيل
   */
  const stopHaptic = useCallback(() => {
    if (isHapticSupported) {
      navigator.vibrate(0);
    }
  }, [isHapticSupported]);

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    doubleTap,
    notificationTap,
    hapticFeedback,
    stopHaptic,
    isSupported: isHapticSupported
  };
};

export default useHaptic;