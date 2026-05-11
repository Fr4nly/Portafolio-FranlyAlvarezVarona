// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fr4nly.github.io',

  base: '/Portafolio-FranlyAlvarezVarona/',

  vite: {
    plugins: [tailwindcss()]
  }
});