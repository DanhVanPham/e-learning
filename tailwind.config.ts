import type { Config } from 'tailwindcss'
import { withUt } from "uploadthing/tw";

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px"
      },
      colors: {
        primary: '#2c8fff',
        secondary: '#ff695a',
        grayDarkest: '#131316',
        grayDarker: '#212126',
        grayDark: '#9394A1',
      },
      fontFamily: {
        primary: ['var(--font-manrope)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gradient': {
          '0%': { backgroundPosition: '0 50%'},
          '50%': { backgroundPosition: '50% 100%'},
          '100%': { backgroundPosition: '0 50%'},
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "gradient": "gradient 3s linear infinite"
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default withUt(config)
