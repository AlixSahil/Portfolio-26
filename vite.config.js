import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vendor code is split into stable, long-cacheable chunks.
export default defineConfig({
  plugins: [react()],
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
