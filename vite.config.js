import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site's public address, used for the canonical URL, Open Graph tags, JSON-LD,
// robots.txt and sitemap.xml. Netlify sets `URL` to each site's own primary address at
// build time, so every deployment describes itself correctly without code changes.
// Override with SITE_URL (e.g. once a custom domain is attached).
const SITE_URL = (
  process.env.SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:4173'
).replace(/\/+$/, '');

function siteUrlPlugin() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', SITE_URL);
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <url>\n    <loc>${SITE_URL}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          '</urlset>\n'
      });
    }
  };
}

// Vendor code is split into stable, long-cacheable chunks.
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-icons')) return 'icons';
          if (id.includes('framer-motion') || id.includes('/motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'react-vendor';
          return 'vendor';
        }
      }
    }
  }
});
