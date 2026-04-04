/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D8D',
          dark: '#E63E7B',
          light: '#FF8DB3',
        },
        economy: {
          DEFAULT: '#9CA3AF',
          dark: '#6B7280',
        },
        premium: {
          DEFAULT: '#FFD700',
          dark: '#FBBF24',
        },
        whatsapp: '#25D366',
        location: '#32CD32',
        ai: '#6A5ACD',
        sets: {
          women: '#8B5CF6',
          kids: '#F97316',
        },
        notification: '#EF4444',
        background: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.3s ease-in-out',
        'pulse-slow': 'pulse 2s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-3px)' },
          '40%': { transform: 'translateX(3px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}