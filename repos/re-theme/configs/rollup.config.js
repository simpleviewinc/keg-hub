import buildHook from './buildHook'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import cleanup from 'rollup-plugin-cleanup'
import replace from '@rollup/plugin-replace'
import { terser } from "rollup-plugin-terser"
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
const isProd = process.env.NODE_ENV === 'production'

const shared = (platform, ext) => ({
  external: ['react', 'react-dom', 'react-native', 'jsutils', '@keg-hub/jsutils', 'react-helmet' ],
  watch: {
    clearScreen: false
  },
  plugins: [
    buildHook(platform),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    alias({
      entries: {
        ReHelmet: `src/helmet/helmet.${ext}`,
      },
    }),
    resolve(),
    babel({
      babelrc: false,
      sourceMaps: true,
      inputSourceMap: true,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs(),
    cleanup(),
    // isProd && terser({
    //   mangle: {
    //     keep_fnames: true,
    //     keep_classnames: true,
    //   }
    // }),
  ],
})

export default Array
  .from([ 'web', 'native' ])
  .map(platform => {
    const ext = platform !== 'web' ? `${platform}.js` : 'js'

    const sharedConfig = shared(platform, ext)
    return {
      ...sharedConfig,
      input: `./src/index.${ext}`,
      output: [
        {
          file: `./build/cjs/reTheme.${ext}`,
          format: 'cjs',
          sourcemap: true
        },
        {
          file: `./build/esm/reTheme.${ext}`,
          format: 'esm',
          sourcemap: true
        },
      ],
      ...(process.env.DOC_APP_PATH && { watch: { chokidar: false } } || {}),
      plugins: [
        ...sharedConfig.plugins,
      ]
    }
  })

