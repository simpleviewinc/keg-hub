import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps';
import alias from '@rollup/plugin-alias'

const shared = {
  external: ['react', 'react-dom', 'react-native', 'jsutils' ],
  watch: {
    clearScreen: false
  },
  plugins: [
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
}

export default Array
  .from([ 'web', 'native' ])
  .map((platform => ({
    ...shared,
    input: `./src/index.js`,
    output: {
      file: `./build/index.${platform}.js`,
      format: "cjs"
    },
    plugins: [
      ...shared.plugins,
      alias({
        entries: {
          KegComponents: `src/components`,
          KegType: `src/components/typography`,
          KegLayout: `src/components/layout`,
          KegButton: `src/components/button/button.${platform}.js`,
          KegContainer: `src/components/layout/container.${platform}.js`,
          KegDrawer: `src/components/drawer/drawer.${platform}.js`,
          KegImg: `src/components/image/image.${platform}.js`,
          KegLoading: `src/components/loading/loading.${platform}.js`,
          KegLink: `src/components/typography/link.${platform}.js`,
          KegTextWrapper: `src/components/typography/textWrapper.${platform}.js`,
        }
      })
    ]
  })))
