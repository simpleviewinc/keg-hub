import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import alias from '@rollup/plugin-alias'
import buildHook from './buildHook'

const babelConfig = require('./babel.config.js')
const { getAliases } = require('./aliases.config')
const { generateBuildInputs } = require('../scripts/generateBuildInputs')

const { DEV_MODE, BUILD_HOOK } = process.env

/**
 * Builds the config for the rollup replace plugin
 * Maps native module imports to web module imports when platform is web 
 * @param {string} platform - current platform (web | native)
 * 
 * @returns {Object} - rollup replace plugin config
 */
const getReplaceConfig = platform => {
  const replaceConfig = {
    preventAssignment: true,
    values: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.RE_PLATFORM": JSON.stringify(platform),
      "process.env.PLATFORM": JSON.stringify(platform),
      "import 'prop-types';": "",
    }
  }

  return platform !== 'web'
    ? replaceConfig
    : {
        ...replaceConfig,
        delimiters: [ '', '' ],
        values: {
          ...replaceConfig.values,
          "from 'react-native';": "from 'react-native-web';",
          "from 'react-native-svg';": "from 'react-native-svg-web';",
        }
      }
}


const shared = {
  external: [
    'react',
    'react-dom',
    'react-native',
    'react-native-web',
    '@keg-hub/jsutils',
    '@keg-hub/re-theme',
    '@keg-hub/re-theme/colors',
    `@keg-hub/re-theme/reStyle`,
    '@keg-hub/re-theme/styleInjector',
    '@keg-hub/re-theme/styleParser',
    'prop-types',
    'expo-fonts',
    'expo-linear-gradient',
    'react-native-svg',
    'react-native-svg-web',
  ],
  watch: {
    clearScreen: false
  },
  plugins: platform => ([
    BUILD_HOOK === platform && DEV_MODE && buildHook(DEV_MODE),
    resolve(),
    json(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      ...babelConfig
    }),
    sourcemaps(),
    replace(getReplaceConfig(platform)),
    cleanup(),
  ])
}

export default Array
  .from([ 'web', 'native' ])
  .map(platform => {
    const ext = platform !== 'web' ? `.${platform}` : ''

    return {
      ...shared,
      input: generateBuildInputs(platform),
      output: [
        {
          dir: `./build/cjs/${platform}`,
          format: 'cjs',
          sourcemap: true
        },
        {
          dir: `./build/esm/${platform}`,
          format: 'esm',
          sourcemap: true
        },
      ],
      ...(process.env.DOC_APP_PATH && { watch: { chokidar: false } } || {}),
      plugins: [
        ...shared.plugins(platform),
        alias({
          entries: getAliases(ext),
        })
      ]
    }
  })

