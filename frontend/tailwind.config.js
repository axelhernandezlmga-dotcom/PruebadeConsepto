/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff4d4f',
        secondary: '#ffc53d',
        dark: '#1f1f1f'
      }
    }
  },
  plugins: []
};
