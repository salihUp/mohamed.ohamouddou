import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const SITE = process.env.SITE || 'https://example.github.io';
const BASE = process.env.BASE || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({ i18n: { defaultLocale: 'fr', locales: { fr: 'fr', en: 'en' } } }),
    icon({
      include: {
        lucide: ['*'],
        'simple-icons': ['github', 'linkedin', 'orcid', 'googlescholar', 'googledrive'],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-light' },
      wrap: true,
    },
  },
  vite: { plugins: [tailwindcss()] },
});
