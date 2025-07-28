import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,    
  target: 'es2020',
  clean: true,
  skipNodeModulesBundle: true,
  external: ['react', 'react-dom'],    
});