import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps';
import buildHook from './buildHook'

const shared = platform => ({
  external: ['react', 'react-dom', 'react-native', 'jsutils', '@ltipton/jsutils' ],
  watch: {
    clearScreen: false
  },
  plugins: [
    buildHook(platform),
    replace({
      "process.env.NODE_ENV": JSON.stringify('production')
    }),
    resolve(),
    babel({ 
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    sourcemaps(),
    commonjs(),
    cleanup(),
  ],
})

export default Array
  .from([ 'web', 'native' ])
  .map(platform => {
    const ext = platform !== 'web' ? `${platform}.js` : 'js'

    const sharedConfig = shared(platform)
    return {
      ...sharedConfig,
      input: `./src/index.${ext}`,
      output: [
        {
          file: `./build/cjs/reTheme.${ext}`,
          format: 'cjs',
          sourcemaps: true
        },
        {
          file: `./build/esm/reTheme.${ext}`,
          format: 'esm',
          sourcemaps: true
        },
      ],
      ...(process.env.DOC_APP_PATH && { watch: { chokidar: false } } || {}),
      plugins: [
        ...sharedConfig.plugins,
      ]
    }
  })

