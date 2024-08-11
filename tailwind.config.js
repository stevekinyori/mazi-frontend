/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#f1491c',
        'brand-blue': '#337ab7',
      },
      screens: {
        xs: '480px'
      },
      spacing: {
        's-0.5': '4px',
        's-1': '8px',
        's-1.5': '12px',
        's-2': '16px',
        's-2.5': '20px',
        's-3': '24px',
        's-3.5': '28px',
        's-4': '32px',
        's-4.5': '36px',
        's-5': '40px',
        's-5.5': '44px',
        's-6': '48px',
        's-6.5': '52px',
        's-7': '56px',
        's-7.5': '60px',
        's-8': '64px',
        's-8.5': '68px',
        's-9': '72px',
        's-9.5': '76px',
        's-10': '80px',
        's-10.5': '84px',
        's-11': '88px',
        's-11.5': '92px',
        's-12': '96px',
        's-12.5': '100px',
        's-13': '104px',
        's-13.5': '108px',
        's-14': '112px',
        's-14.5': '116px',
        's-15': '120px',
        's-15.5': '124px',
        's-16': '128px',
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
      },
    },
  },
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
  },
  important: true,
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
