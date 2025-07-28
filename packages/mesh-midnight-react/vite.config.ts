import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [wasm(), react(), viteCommonjs(), topLevelAwait(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MyUILibrary",
      fileName: "index",
      formats: ["es"],
    }, 
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@midnight-ntwrk/onchain-runtime"],
      output: {
        // This ensures CSS is properly bundled
        assetFileNames: "index.[ext]",
         // Add this to handle large chunks
         manualChunks: {},
         chunkFileNames: '[name].js'
      },
    },
    // Increase the chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'esbuild',
    // Enable sourcemaps for better debugging
    sourcemap: true
  },
  optimizeDeps: {    
    exclude: [      
      "@midnight-ntwrk/onchain-runtime"
    ],
  },  
});