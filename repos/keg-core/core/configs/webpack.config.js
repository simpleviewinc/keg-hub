/* eslint-disable */

const path = require('path')
const tapPath = require('app-root-path').path
const kegPath = path.join(__dirname, '../../')
const getExpoConfig = require('@expo/webpack-config')
const { NODE_ENV } = process.env

module.exports = rootDir => {
  return async (env, argv) => {

    /**
     * Get the default expo webpack config so we can add the tap-resolver
     */
    const config = await getExpoConfig(env, argv)

    /**
     * Force the correct NODE_ENV for the webpack bundle
     */
     config.mode = NODE_ENV || 'development'

    /**
     * Setup our JS files to use the tap-resolver through babel
     */
    config.module.rules.unshift({
      test: /\.js?$/,
      include: [
        path.resolve(tapPath),
      ],
      exclude: /node_modules\/(?!(sv-keg)\/).*/,
      loader: require.resolve('babel-loader')
    })

    // necessary to provide web workers access to the window object and 
    // postMessage function (see https://github.com/webpack/webpack/issues/6642#issuecomment-371087342)
    config.output.globalObject = 'this'

    /**
     * Ensure node_modules can be resolved for both the keg and the tap
     */
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(kegPath, 'node_modules'),
      path.resolve(tapPath, 'node_modules'),
    ]

    return config
  }
}
