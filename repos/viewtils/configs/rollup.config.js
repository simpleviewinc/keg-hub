import babel from '@rollup/plugin-babel'
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
  classes: 'src/classes',
  colors: 'src/colors',
  elements: 'src/elements',
  getters: 'src/getters',
  react: 'src/react',
}

const buildPlugins = (type, extra) => {
  return [
    DEV_MODE && buildHook(type),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      ...babelConfig
    }),
    sourcemaps(),
    cleanup(),
    ...(extra.plugins || []),
  ]
}

const buildConfig = (type, extra={}) => {
  return {
    external: [
      'react',
      'react-dom',
      'react-native',
      'react-native-web',
      '@keg-hub/jsutils',
    ],
    input: extra.input || {
      index: `./src/index.js`,
      ...inputs
    },
    output: extra.output || {
      dir: `${buildPath}/${type}`,
      format: type,
      sourcemap: true,
      ...extra.output
    },
    plugins: buildPlugins(type, extra),
    watch: { clearScreen: false },
  }
}

export default Array.from([ 'cjs', 'esm' ])
  .map(type => {
    return type !== 'umd'
      ? buildConfig(type)
      : buildConfig(type, {
          input: `./src/index.js`,
          output: {
            name: 'viewtils',
            file: `${buildPath}/${type}/index.js`,
            format: type,
            sourcemap: true,
            esModule: false,
          },
          plugins: [
            terser()
          ]
        })

  })

