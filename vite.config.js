import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split React and React DOM into separate chunk
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // Split framer-motion (large animation library)
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          // Split Three.js ecosystem if used
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          // Split other large dependencies
          if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'ui-vendor';
          }
          // Dev tools chunk (only loaded in development due to conditional in App.jsx)
          if (id.includes('@21st-extension')) {
            return 'dev-tools';
          }
        },
      },
    },
    // Increase chunk size warning limit
    // Note: dev-tools chunk is large but only loaded in development mode
    chunkSizeWarningLimit: 600,
  },
})
