import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasm(),
    react(),
    viteCommonjs(),
    topLevelAwait(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.tsx']
    }),    
    tailwindcss()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MyUILibrary",      
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@midnight-ntwrk/onchain-runtime"],
    },
    // Keep CSS in the JS bundle
    cssCodeSplit: false,
    // Use esbuild for faster builds
    minify: 'esbuild',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Target modern browsers
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {    
    exclude: [      
      "@midnight-ntwrk/onchain-runtime"
    ],
  },  
});