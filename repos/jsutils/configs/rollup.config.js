import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import buildHook from './buildHook'
import { terser } from 'rollup-plugin-terser'

const { DEV_MODE } = process.env
const babelConfig = require('./babel.config.js')
const buildPath = `./build`

const inputs = {
  array: 'src/array',
  boolean: 'src/boolean',
  collection: 'src/collection',
  ext: 'src/ext',
  log: 'src/log',
  method: 'src/method',
  number: 'src/number',
  object: 'src/object',
  promise: 'src/promise',
  string: 'src/string',
  url: 'src/url',
}

const buildPlugins = (type, extra) => {
  return [
    ...(extra.plugins || []),
    DEV_MODE && buildHook(type),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      ...babelConfig
    }),
    sourcemaps(),
    cleanup(),
  ]
}

const buildConfig = (type, extra={}) => {
  return {
    input: extra.input || {
      index: `./src/index.js`,
      ...inputs
    },
    output: extra.output || {
      dir: `${buildPath}/${type}`,
      format: type,
      sourcemaps: true,
      ...extra.output
    },
    plugins: buildPlugins(type, extra),
    watch: { clearScreen: false },
  }
}

export default Array.from([ 'umd', 'cjs', 'esm' ])
  .map(type => {
    return type !== 'umd'
      ? buildConfig(type)
      : buildConfig(type, {
          input: `./src/index.js`,
          output: {
            name: 'jsutils',
            file: `${buildPath}/${type}/index.js`,
            format: type,
            sourcemaps: true,
            esModule: false,
          },
          plugins: [
            terser()
          ]
        })

  })

