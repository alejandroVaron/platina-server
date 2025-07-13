import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  clean: true,
  dts: false,
  sourcemap: true,
  target: 'es2020',
  skipNodeModulesBundle: true,
});