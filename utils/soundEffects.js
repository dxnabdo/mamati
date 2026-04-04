// إدارة المؤثرات الصوتية
const soundFiles = {
  add: '/sounds/add.mp3',
  remove: '/sounds/remove.mp3',
  favorite: '/sounds/favorite.mp3',
  success: '/sounds/success.mp3',
  notify: '/sounds/notify.mp3',
  error: '/sounds/error.mp3',
};

let audioElements = {};

// تحميل الأصوات
export function initSounds() {
  if (typeof window === 'undefined') return;
  
  Object.keys(soundFiles).forEach(key => {
    audioElements[key] = new Audio(soundFiles[key]);
    audioElements[key].volume = 0.5;
  });
}

// تشغيل صوت
export function playSound(soundName) {
  if (typeof window === 'undefined') return;
  
  const audio = audioElements[soundName];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log('🔇 صوت محظور:', e));
  }
  
  // اهتزاز
  if (navigator.vibrate) {
    switch(soundName) {
      case 'add':
      case 'favorite':
        navigator.vibrate(30);
        break;
      case 'success':
        navigator.vibrate(40);
        break;
      case 'error':
        navigator.vibrate(100);
        break;
      default:
        navigator.vibrate(15);
    }
  }
}

// إيقاف جميع الأصوات
export function stopAllSounds() {
  Object.values(audioElements).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}