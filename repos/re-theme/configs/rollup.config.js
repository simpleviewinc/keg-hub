import buildHook from './buildHook'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import cleanup from 'rollup-plugin-cleanup'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"
const { getAliases } = require("./aliases.config")

// Need to require our babel.config.js because it uses module.exports
const babelConfig = require('../babel.config.js')

const isProd = process.env.NODE_ENV === 'production'

// Default location of the build output
const buildPath = `./build`

// List of alternate exports
// This allows importing only when you need
const inputs = {
  styleInjector: './src/styleInjector/index.{{platform}}',
  colors: './src/helpers/colors.js',
}

const buildConfig = (type, ext, platform, config) => {
  return {
    ...config,
    plugins: [
      buildHook(platform, type),
      ...config.plugins,
    ],
    input: {
      index: `./src/index.${ext}`,
      ...Object.keys(inputs)
        .reduce((converted, key) => {
          converted[key] = inputs[key].replace('{{platform}}', ext)

          return converted
        }, {})
    },
    output: {
      dir: `${buildPath}/${type}/${platform}`,
      format: type,
      sourcemap: true,
    },
    watch: {
      clearScreen: false,
      ...(process.env.DOC_APP_PATH && { chokidar: false } || {}),
    },
  }
}


const shared = (platform, ext) => ({
  external: [
    'react',
    'react-dom',
    'react-native',
    'jsutils',
    '@keg-hub/jsutils',
    'react-native-web/dist/modules/prefixStyles',
    'react-native-web/dist/modules/flattenArray',
    'react-native-web/dist/exports/StyleSheet/flattenStyle',
    'react-native-web/dist/exports/StyleSheet/createReactDOMStyle',
    'react-native-web/dist/exports/StyleSheet/createCompileableStyle',
  ],
  watch: {
    clearScreen: false
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    alias({
      entries: getAliases(ext),
    }),
    resolve(),
    babel({
      babelrc: false,
      sourceMaps: true,
      inputSourceMap: true,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      ...babelConfig,
    }),
    commonjs(),
    cleanup(),
    isProd && terser({
      mangle: {
        keep_fnames: true,
        keep_classnames: true,
      }
    }),
  ],
})

// Rollup accepts an array of configs as an export
// Which allows us to loop over the platform types for native and web
export default Array.from([ 'web', 'native' ])
  .reduce((apps, platform) => {
    // Get the extension for the inputs and outputs based on platform
    const ext = platform !== 'web' ? `${platform}.js` : 'js'

    const sharedConfig = shared(platform, ext)
    
    // Loop over the export types of cjs and esm
    // Most bundler use esm, but include cjs just incase
    const configs = Array.from([ 'cjs', 'esm' ])
      .map(type => buildConfig(type, ext, platform, sharedConfig))

    // Configs is an array of our export types
    // apps if an array of the platform types
    // Use concat to flatten the array to export multiple bundle configs
    return apps.concat(configs)
  }, [])

