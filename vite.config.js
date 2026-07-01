import { defineConfig } from 'vite';

// Split heavy vendors into their own chunks so the shader/animation/icon code doesn't
// sit in one 500KB+ entry bundle. JSX is still handled by Vite's built-in esbuild.
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/three/') || id.includes('@react-three')) return 'three';
          if (id.includes('react-icons')) return 'icons';
          if (id.includes('/ogl/')) return 'webgl';
          if (id.includes('/gsap/')) return 'gsap';
          if (id.includes('framer-motion') || id.includes('/motion/')) return 'motion';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) return 'react-vendor';
          return 'vendor';
        }
      }
    }
  }
});
