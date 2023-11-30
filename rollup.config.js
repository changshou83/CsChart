import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/cschart.js',
      format: 'cjs',
    },
    {
      file: 'esm/cschart.js',
      format: 'es',
    },
    {
      file: 'dist/cschart.min.js',
      name: 'sp',
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    babel(),
    uglify(),
  ],
};
