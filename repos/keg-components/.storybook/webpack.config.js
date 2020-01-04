const path = require('path')
const webpack = require('webpack')
const platform = process.env.RE_PLATFORM || 'web'

module.exports = ({ config, mode }) => {

  config.resolve.extensions = [
    platform === 'native' && ".native.js" || ".web.js",
    ...config.resolve.extensions,
  ]

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  })

  config.resolve.alias = {
    ...config.resolve.alias,
    KegButton: path.resolve(__dirname, `../src/components/button/button.${platform}.js`),
    KegForm: path.resolve(__dirname, `../src/components/form/${platform}/index.js`),
    KegImg: path.resolve(__dirname, `../src/components/image/image.${platform}.js`),
    KegIndicator: path.resolve(__dirname, `../src/components/indicator/indicator.${platform}.js`),
    KegInput: path.resolve(__dirname, `../src/components/form/input/input.${platform}.js`),
    KegLink: path.resolve(__dirname, `../src/components/typeface/link.${platform}.js`),
    KegText: path.resolve(__dirname, `../src/components/typeface/kegtext.${platform}.js`),
    KegView: path.resolve(__dirname, `../src/components/view/view.${platform}.js`),
    "react-native": "react-native-web/dist/cjs"
  }

  config.plugins = config.plugins.map(plugin => {

    plugin &&
      plugin.constructor.name === 'DefinePlugin' &&
      (plugin.definitions['process.env'] = {
          ...plugin.definitions['process.env'],
          RE_PLATFORM: JSON.stringify(platform)
      })

    return plugin
  })

  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({ RE_PLATFORM: platform })
  ]

  return config
}