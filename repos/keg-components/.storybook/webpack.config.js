const path = require('path')
const webpack = require('webpack')
const { aliases } = require('../configs/aliases.config')
const { get } = require('jsutils')
const platform = process.env.RE_PLATFORM || 'web'

// Hard coded plugins
const addPlugins = [
  // Find the DefinePlugin, and add the ENV
  new webpack.DefinePlugin({ RE_PLATFORM: platform })
]

// Hard coded aliases
const addAliases = {
  // Add the react-native-web overwrite
  "react-native": "react-native-web/dist/cjs",
}

// Hard coded Rules
const addRules = [
  // Add the source loader for jsx files, which allows our story plugin to work
  {
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  }
]

// Set custom extensions based on the platform
// This will ensure the platform file is loaded over the default
const customExtensions = extensions => {
  return [
    platform === 'native' && ".native.js" || ".web.js",
    ...extensions,
  ]
}

// Set custom aliases based on the platform
const customAliases = wpAliases => {

  // Loop over the aliases and set the platform
  const updated = Object
    .keys(aliases)
    .reduce((updatedAliases, key) => {
    updatedAliases[key] = path.resolve(__dirname, `../${aliases[key]}`)

    return updatedAliases
  }, {})

  // Return updated aliases with the addAliases
  return {
    ...wpAliases,
    ...updated,
    ...addAliases
  }

}

// Add the RE_PLATFORM ENV converted to the current platform
const customPlugins = plugins => {

  const updated = plugins.map(plugin => {
    // Find the DefinePlugin, and add the ENV
    get(plugin, 'constructor.name') === 'DefinePlugin' &&
      (plugin.definitions['process.env'] = {
          ...plugin.definitions['process.env'],
          RE_PLATFORM: JSON.stringify(platform)
      })

    return plugin
  })

  return updated.concat(addPlugins)
}

// Set custom rules for webpack
const customRules = rules => {
  
  const updated = rules.reduce((updatedRules, rule) => {
    // Remove the eslint loader that we don't use
    get(rule, 'use.0.loader', '').indexOf('eslint-loader') === -1 && updatedRules.push(rule)

    return updatedRules
  }, [])

  return updated.concat(addRules)
}

module.exports = ({ config, mode }) => {

  // Setup custom extensions for loading platform specific files
  config.resolve.extensions = customExtensions(config.resolve.extensions)

  // Setup custom rule settings
  config.module.rules = customRules(config.module.rules)

  // Add custom aliases
  config.resolve.alias = customAliases(config.resolve.alias)

  // Setup custom plugin settings
  config.plugins = customPlugins(config.plugins)

  return config
}