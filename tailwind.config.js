/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sandy: {
          DEFAULT: '#F8F5EF',   // was #F5E6D3 — toned down to near off-white
          dark:    '#EDE8DF',   // was #E8D0B0
          darker:  '#DDD6C8',   // was #D4B896
        },
        // Lightened to a warm medium tropical green — not near-black
        jungle: {
          DEFAULT: '#2D5A2D',
          light:   '#4A8A4A',
          muted:   '#6BA06B',
          dark:    '#1D3D1D',
          900:     '#111F11',
        },
        fuchsia: {
          DEFAULT: '#FF007F',
          light:   '#FF4DA6',
          dark:    '#CC0066',
          50:      '#FFF0F7',
        },
        mango: {
          DEFAULT: '#FFA500',
          light:   '#FFB833',
          dark:    '#CC8400',
          50:      '#FFF8E6',
        },
        // Very pale tropical sage — hero right panel
        sage: {
          DEFAULT: '#DCE9D0',
          light:   '#EEF5E8',
          dark:    '#C4D9B4',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
