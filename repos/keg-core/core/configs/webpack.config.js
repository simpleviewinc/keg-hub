/* eslint-disable */

const path = require('path')
const tapPath = require('app-root-path').path
const kegPath = path.join(__dirname, '../../')
const getExpoConfig = require('@expo/webpack-config')

module.exports = rootDir => {
  return async (env, argv) => {
    const expoConfig = await getExpoConfig(env, argv)

    expoConfig.module.rules.unshift({
      test: /\.js?$/,
      include: [
        path.resolve(tapPath),
      ],
      exclude: /node_modules\/(?!(sv-keg)\/).*/,
      loader: require.resolve('babel-loader')
    })

    expoConfig.resolve.modules = [
      ...(expoConfig.resolve.modules || []),
      path.resolve(kegPath, 'node_modules'),
      path.resolve(tapPath, 'node_modules'),
    ]

    return expoConfig
  }
}
