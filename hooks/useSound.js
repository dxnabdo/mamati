import { useCallback, useEffect, useRef } from 'react';
import useHaptic from './useHaptic';

// ملفات الصوت المتوفرة
const SOUND_FILES = {
  add: '/sounds/add.mp3',
  remove: '/sounds/remove.mp3',
  favorite: '/sounds/favorite.mp3',
  success: '/sounds/success.mp3',
  notify: '/sounds/notify.mp3',
  error: '/sounds/error.mp3',
  click: '/sounds/add.mp3', // افتراضي
};

// هوك للتحكم في الأصوات
const useSound = () => {
  const audioRefs = useRef({});
  const { hapticFeedback } = useHaptic();

  // تحميل الأصوات عند بدء التشغيل
  useEffect(() => {
    // إنشاء كائنات Audio لكل صوت
    Object.entries(SOUND_FILES).forEach(([key, path]) => {
      if (typeof window !== 'undefined') {
        const audio = new Audio(path);
        audio.volume = 0.5; // مستوى الصوت 50%
        audioRefs.current[key] = audio;
      }
    });

    // تنظيف الأصوات عند إلغاء التحميل
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      audioRefs.current = {};
    };
  }, []);

  /**
   * تشغيل صوت معين
   * @param {string} soundName - اسم الصوت (add, remove, favorite, success, notify, error)
   * @param {Object} options - خيارات إضافية
   */
  const playSound = useCallback((soundName = 'click', options = {}) => {
    const {
      volume = 0.5,
      withHaptic = true,
      hapticType = soundName,
    } = options;

    const audio = audioRefs.current[soundName];
    
    if (audio) {
      // إعادة تعيين الصوت إذا كان قيد التشغيل
      audio.pause();
      audio.currentTime = 0;
      
      // ضبط مستوى الصوت
      audio.volume = volume;
      
      // تشغيل الصوت
      audio.play().catch(error => {
        console.log('⚠️ لا يمكن تشغيل الصوت:', error);
      });
    }

    // تشغيل الاهتزاز إذا كان مطلوباً
    if (withHaptic) {
      hapticFeedback(hapticType);
    }
  }, [hapticFeedback]);

  /**
   * إيقاف صوت معين
   * @param {string} soundName - اسم الصوت
   */
  const stopSound = useCallback((soundName) => {
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  /**
   * إيقاف جميع الأصوات
   */
  const stopAllSounds = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, []);

  /**
   * تغيير مستوى الصوت لجميع الأصوات
   * @param {number} newVolume - مستوى الصوت (0.0 إلى 1.0)
   */
  const setMasterVolume = useCallback((newVolume) => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.volume = Math.max(0, Math.min(1, newVolume));
      }
    });
  }, []);

  // دوال مختصرة للأصوات الشائعة
  const playAddSound = useCallback((options = {}) => {
    playSound('add', { hapticType: 'add', ...options });
  }, [playSound]);

  const playRemoveSound = useCallback((options = {}) => {
    playSound('remove', { hapticType: 'remove', ...options });
  }, [playSound]);

  const playFavoriteSound = useCallback((options = {}) => {
    playSound('favorite', { hapticType: 'favorite', ...options });
  }, [playSound]);

  const playSuccessSound = useCallback((options = {}) => {
    playSound('success', { hapticType: 'success', ...options });
  }, [playSound]);

  const playNotificationSound = useCallback((options = {}) => {
    playSound('notify', { hapticType: 'notification', ...options });
  }, [playSound]);

  const playErrorSound = useCallback((options = {}) => {
    playSound('error', { hapticType: 'error', ...options });
  }, [playSound]);

  const playClickSound = useCallback((options = {}) => {
    playSound('click', { hapticType: 'click', ...options });
  }, [playSound]);

  return {
    playSound,
    playAddSound,
    playRemoveSound,
    playFavoriteSound,
    playSuccessSound,
    playNotificationSound,
    playErrorSound,
    playClickSound,
    stopSound,
    stopAllSounds,
    setMasterVolume,
  };
};

export default useSound;