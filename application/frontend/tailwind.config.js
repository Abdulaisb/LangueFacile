/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fade_in: {
          '0%' : {opacity: 0},
          '100%' : { opacity: 1}
        },
        from_left: {
          '0%': {transform: 'translateX(-20%)'},
          '100%': {transform: 'translateX(0%)'},
        },
        from_right: {
          '0%': {transform: 'translateX(20%)'},
          '100%': {transform: 'translateX(0%)'},
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'fade-1': 'fade_in 0.5s ease-in forwards',
        'fade-2': 'fade_in 0.5s ease-in 0.4s forwards',
        'fade-3': 'fade_in 0.3s ease-in forwards',
        'fade-left': 'fade_in 0.7s ease-in 0.4s forwards, from_left 0.7s ease-in 0.4s forwards',
        'fade-right': 'fade_in 0.7s ease-in 0.4s forwards, from_right 0.7s ease-in 0.4s forwards',
      },
      height: {
        'nh': '7%',
        'ah': '93%'
      }
    },
  },
  plugins:  [
    function({ addUtilities }) {
      addUtilities({
        '.bg-radial-dark': {
          'background-image': 'radial-gradient(#6b7280, #1f2937)',
        },
      });
    },
  ],
}
