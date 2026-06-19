import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Let Vite handle code-splitting automatically via lazy imports
        // Do NOT manually chunk three/r3f/framer — it defeats lazy loading
      },
    },
  },
})

