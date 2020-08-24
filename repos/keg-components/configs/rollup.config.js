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

const { DEV_MODE, BUILD_HOOK } = process.env
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
    '@svkeg/jsutils',
    '@svkeg/re-theme',
    'prop-types',
    'expo-fonts'
  ],
  watch: {
    clearScreen: false
  },
  plugins: platform => ([
   BUILD_HOOK === platform && DEV_MODE && buildHook(DEV_MODE),
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
  .map(platform => {
    const ext = platform !== 'web' ? `${platform}.js` : 'js'
    return {
      ...shared,
      input: `./src/index.js`,
      output: [
        {
          file: `./build/cjs/kegComponents.${ext}`,
          format: 'cjs',
          sourcemap: true
        },
        {
          file: `./build/esm/kegComponents.${ext}`,
          format: 'esm',
          sourcemap: true
        },
      ],
      ...(process.env.DOC_APP_PATH && { watch: { chokidar: false } } || {}),
      plugins: [
        ...shared.plugins(platform),
        alias({
          entries: getAliases(platform),
        })
      ]
    }
  })

