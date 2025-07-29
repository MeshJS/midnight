import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [wasm(), react(), viteCommonjs(), topLevelAwait(), tailwindcss()],  //add plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),      
    },
  },
  // exclude bundling the onchain runtime during dev
  optimizeDeps: {    
    exclude: [      
      "@midnight-ntwrk/onchain-runtime"
    ],
  },
})
