/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Phrolova-inspired palette
        'void':       '#08060e',
        'abyss':      '#0d0a17',
        'phantom':    '#150f24',
        'havoc':      '#1a0f2e',
        'crimson': {
          DEFAULT:    '#c91440',
          light:      '#e8264f',
          dark:       '#8a0d2b',
          glow:       '#ff1a50',
        },
        'orchid': {
          DEFAULT:    '#7b2d8e',
          light:      '#a94fbf',
          dark:       '#4a1a55',
          glow:       '#c44dff',
        },
        'silver': {
          DEFAULT:    '#b8b8c8',
          light:      '#e0e0ea',
          dark:       '#6e6e80',
          glow:       '#f0f0ff',
        },
      },
      fontFamily: {
        'display':  ['var(--font-display)', 'serif'],
        'heading':  ['var(--font-heading)', 'sans-serif'],
        'body':     ['var(--font-body)', 'sans-serif'],
        'mono':     ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'shimmer':      'shimmer 3s linear infinite',
        'bloom':        'bloom 8s ease-in-out infinite',
        'wave':         'wave 2s ease-in-out infinite',
        'fade-up':      'fade-up 0.8s ease-out forwards',
        'spin-slow':    'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 20, 64, 0.3), 0 0 60px rgba(123, 45, 142, 0.1)' },
          '50%':      { boxShadow: '0 0 40px rgba(201, 20, 64, 0.6), 0 0 120px rgba(123, 45, 142, 0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bloom: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.8' },
          '25%':      { transform: 'scale(1.05) rotate(3deg)', opacity: '1' },
          '50%':      { transform: 'scale(1.1) rotate(0deg)', opacity: '0.9' },
          '75%':      { transform: 'scale(1.05) rotate(-3deg)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%':      { transform: 'scaleY(1.5)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
