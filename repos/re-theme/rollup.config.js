import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser'
import buildHook from './buildHook'

const outputFile = "./build/index.js"

export default {
  input: "./src/index.js",
  output: {
    file: outputFile,
    format: "cjs"
  },
  external: ['react', 'react-native', 'jsutils' ],
  watch: {
    clearScreen: false
  },
  plugins: [
    buildHook(),
    replace({
      "process.env.NODE_ENV": JSON.stringify('production')
    }),
    resolve(),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    }),
    sourcemaps(),
    // terser(),
    commonjs(),
    cleanup(),
  ],
}