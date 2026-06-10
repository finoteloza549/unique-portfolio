/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          bg: '#0a0b0e',
          card: '#11141a',
          cardBorder: '#1e2430',
          cyan: '#00f0ff',
          cyanDark: '#00a3b0',
          amber: '#ffb300',
          amberDark: '#b27d00',
          red: '#ff1744',
          redDark: '#b2102f',
          text: '#e2e8f0',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        title: ['Oswald', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.98' },
          '50%': { opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
