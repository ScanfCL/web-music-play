/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1eb854',
          secondary: 'black',
          accent: '#1eb854',
          neutral: '#111111',
          'base-100': 'black',
        },
      },
      'dark',
      'cupcake',
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
