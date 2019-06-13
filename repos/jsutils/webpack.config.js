const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('./node_modules/terser-webpack-plugin/dist/cjs')
const libraryName = 'jsutils'
const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'
const buildPath = 'build'
const outputFile = '.js'
const outputPath = path.resolve(__dirname, buildPath)
const paths = [ './build' ]
const WebpackShellPlugin = require('webpack-shell-plugin');

const plugins = [
  new CleanWebpackPlugin(paths, {}),
  new CopyWebpackPlugin([
    { from: './src/example/index.html' },
    { from: './src/example/index.css' },
    { from: './src/example/github.css' },
  ]),
  new WebpackShellPlugin({
    onBuildEnd: [ 'yarn build:modules' ],
    dev: false
  })
]

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  entry: {
    [libraryName]: './src/scripts/index.js',
    markdown: './src/example/markdown.js'
  },
  output: {
    path: outputPath,
    filename: '[name].min' + outputFile,
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "(typeof self !== 'undefined' ? self : this)"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        use: {
          loader: 'raw-loader',
        }
      },
      { enforce: 'pre', test: /\.(js|css)$/, loader: 'remove-comments-loader' }
    ]
  },
  plugins: plugins,
  optimization: {
    nodeEnv: NODE_ENV,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `${packageName.replace('@', '')}`
          },
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          sourceMap: isDev,
        }
      })
    ]
  }
}
