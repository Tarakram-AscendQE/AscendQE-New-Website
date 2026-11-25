/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // site.css owns the base styles (it is the original Lean site stylesheet).
    preflight: false,
  },
  theme: {
    extend: {
      // Tokens map to the CSS variables in site.css, so utilities follow light/dark automatically.
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        band: 'var(--band)',
        ship: 'var(--ship)',
        fix: 'var(--fix)',
        stop: 'var(--stop)',
      },
      fontFamily: {
        head: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
