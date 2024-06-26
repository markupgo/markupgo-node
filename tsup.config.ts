import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: false,
  format: ['cjs', 'esm'],
  minify: false,
  tsconfig: 'tsconfig.json',
  treeshake: false,
  target: 'esnext',
  dts: true,
});
