import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps';
import alias from '@rollup/plugin-alias'
import buildHook from './buildHook'

const shared = platform => ({
  external: ['react', 'react-dom', 'react-native', '@ltipton/jsutils' ],
  watch: {
    clearScreen: false
  },
  plugins: [
    // buildHook(platform),
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
    const sharedConfig = shared(platform) 
    return {
      ...sharedConfig,
      input: `./src/index.${platform}.js`,
      output: [
        {
          file: `./build/cjs/reTheme.${platform}.js`,
          format: 'cjs',
          sourcemaps: true
        },
        {
          file: `./build/esm/reTheme.${platform}.js`,
          format: 'esm',
          sourcemaps: true
        },
      ],
      ...(process.env.DOC_APP_PATH && { watch: { chokidar: false } } || {}),
      plugins: [
        ...sharedConfig.plugins,
        alias({
          entries: {
            ReDimensions: `src/dimensions/dimensions.${platform}.js`,
            RePlatform: `src/context/platform.${platform}.js`,
            ReJoinTheme: `src/cache/joinTheme.${platform}.js`,
            ReHooks: `src/hooks/index.${platform}.js`,
          }
        })
      ]
    }
  })

