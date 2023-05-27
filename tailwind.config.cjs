/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'moderate-blue': 'hsl(238, 40%, 52%)',
        'soft-red': ' hsl(358, 79%, 66%)',
        'light-grayish-blue': 'hsl(239, 57%, 85%)',
        'pale-red': 'hsl(357, 100%, 86%)',
        'dark-blue': 'hsl(212, 24%, 26%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'very-light-gray': 'hsl(228, 33%, 97%)'
      },
      fontFamily: {
        sans: ['Rubik']
      },
      keyframes: {
        heartbeat: {
          '0%, 45%': { transform: 'scale(1)', transformOrigin: 'center center', animationTimingFunction: 'ease-out' },
          '10%': { transform: 'scale(0.91)', animationTimingFunction: 'ease-in' },
          '17%': { transform: 'scale(0.98)', animationTimingFunction: 'ease-out' },
          '33%': { transform: 'scale(0.87)', animationTimingFunction: 'ease-out' }
        }
      }
    },
    animation: {
      heartbeat: 'heartbeat 500ms ease-in-out both'
    }
  },
  safelist: ['animate-heartbeat'],
  plugins: []
};

module.exports = config;
