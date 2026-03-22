import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0D0E0C',
        surface: '#141512',
        's2': '#1B1C18',
        border: '#252621',
        border2: '#2E2F2A',
        accent: '#C4622D',
        'accent-lt': '#D9774A',
        tx: '#EDE9E0',
        muted: '#72706A',
        dim: '#6B6965',
        'g-green': '#4DAF7C',
        'g-amber': '#D4A23A',
        'g-red': '#D95C5C',
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'sans-serif'],
        display: ['var(--font-instrument-serif)', 'serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
