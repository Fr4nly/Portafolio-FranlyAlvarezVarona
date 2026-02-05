/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./docs/**/*.{html,js}",
  ],

  safelist: [
    'animate-star-twinkle-slow',
    'animate-star-twinkle-medium',
    'animate-star-twinkle-fast',
    'animate-star-twinkle-random',
    'animate-star-twinkle-pulse',
    'animate-stars-drift-x',
    'animate-stars-drift-y',
    'animate-nebula-glow',
    'animate-atmosphere-pulse',

    // backgrounds con opacidad
    'bg-white/5',
    'bg-white/10',
    'bg-black/40',
    'bg-black/60',

    // bordes
    'border-white/10',
    'border-white/20',

    // blur
    'backdrop-blur',
    'backdrop-blur-md',
    'backdrop-blur-lg',
    'backdrop-blur-xl',

    // animaciones / transiciones
    'opacity-0',
    'opacity-100',
    'scale-95',
    'scale-100',
    'translate-y-2',
    'translate-y-0',

    // sombras custom
    'shadow-xl',
    'shadow-2xl',
  ],

  theme: {
    extend: {
      colors: {
        'space-deep': '#05051a',
        'space-mid': '#0a0a2a',
        'space-light': '#1a1a4a',
      },

      backgroundImage: {
        'space-gradient':
          'linear-gradient(to top, #05051a 0%, #0a0a2a 30%, #1a1a4a 60%, #2a2a6a 100%)',
      },

      animation: {
        'star-twinkle-slow': 'starTwinkleSlow 8s ease-in-out infinite',
        'star-twinkle-medium': 'starTwinkleMedium 6s ease-in-out infinite',
        'star-twinkle-fast': 'starTwinkleFast 4s ease-in-out infinite',
        'star-twinkle-random': 'starTwinkleRandom 7s ease-in-out infinite',
        'star-twinkle-pulse': 'starTwinklePulse 5s ease-in-out infinite',

        'stars-drift-x': 'starsDriftX 200s linear infinite',
        'stars-drift-y': 'starsDriftY 150s linear infinite',

        'nebula-glow': 'nebulaGlow 60s ease-in-out infinite',
        'atmosphere-pulse': 'atmospherePulse 40s ease-in-out infinite',
      },

      keyframes: {
        starTwinkleSlow: {
          '0%,100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        starTwinkleMedium: {
          '0%,100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.2)' },
        },
        starTwinkleFast: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        starTwinkleRandom: {
          '0%': { opacity: '0.2' },
          '25%': { opacity: '0.9' },
          '50%': { opacity: '0.4' },
          '75%': { opacity: '1' },
          '100%': { opacity: '0.3' },
        },
        starTwinklePulse: {
          '0%,100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },

        starsDriftX: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
        starsDriftY: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 200%' },
        },

        nebulaGlow: {
          '0%,100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        atmospherePulse: {
          '0%,100%': { opacity: '0.15' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },

  plugins: [],

  
}
