/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontSize: {
        caption: ['13.5px', { lineHeight: '1.6' }],
        fine: ['13.5px', { lineHeight: '1.6' }],
      },
      colors: {
        primary: {
          DEFAULT: '#1763ff',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        border: '#e0e5ef',
        navy: {
          DEFAULT: '#071327',
          dark: '#040b17',
          light: '#0e1e38',
        },
        blue: {
          DEFAULT: '#1763ff',
          hover: '#0e53e6',
          light: '#eef4ff',
          muted: '#719fff',
        },
        ink: {
          DEFAULT: '#0b1831',
          muted: '#69758a',
          light: '#94a3b8',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          card: '#f1f5f9',
          border: '#e0e5ef',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
