import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      name: '@react-hookful/template',
      format: 'umd',
      sourcemap: true,
    },
  ],
  external: ['react'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      allowAllFormats: true,
    }),
    terser(),
  ],
};
