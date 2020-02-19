import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import alias from '@rollup/plugin-alias'
import pathAlias from './aliases.json'
import buildHook from './buildHook'

const { DEV_MODE } = process.env
const babelConfig = require('./babel.config.js')

const getAliases = platform => Object
  .keys(pathAlias)
  .reduce((updated, key) => {
    updated[key] = pathAlias[key].replace(/\$\{platform\}/g, platform)

    return updated
  }, {})


const shared = {
  external: [
    'react',
    'react-dom',
    'react-native',
    'jsutils',
    're-theme',
    'prop-types',
    '@expo/vector-icons',
    'expo-fonts'
  ],
  watch: {
    clearScreen: false
  },
  plugins: platform => ([
    platform === 'native' && DEV_MODE && buildHook(DEV_MODE),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.RE_PLATFORM": JSON.stringify(platform),
      "process.env.PLATFORM": JSON.stringify(platform),
    }),
    resolve(),
    json(),
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
  ])
}

export default Array
  .from([ 'web', 'native' ])
  .map((platform => ({
    ...shared,
    input: `./src/index.js`,
    output: [
      {
        file: `./build/cjs/kegComponents.${platform}.js`,
        format: 'cjs',
        sourcemaps: true
      },
      {
        file: `./build/esm/kegComponents.${platform}.js`,
        format: 'esm',
        sourcemaps: true
      },
    ],
    plugins: [
      ...shared.plugins(platform),
      alias({
        entries: getAliases(platform),
      })
    ]
  })))
