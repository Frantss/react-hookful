import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true },
    { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
    { file: 'dist/index.umd.js', name: '@react-hookful/core', format: 'umd', sourcemap: true },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
};
