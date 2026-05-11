/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Expletus Sans"', 'system-ui', 'sans-serif'],
        'expletus': ['"Expletus Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};