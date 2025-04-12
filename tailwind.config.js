/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,scss,css,sass}",
  ],
  theme: {
    extend: {
      // 自定义样式
      animation: {
        progress: 'progress 2s linear infinite',
      },
      keyframes: {
        progress: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}

