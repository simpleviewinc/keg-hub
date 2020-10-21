const path = require('path')
const webpack = require('webpack')
const { aliases } = require('./aliases.config')
const babelConfig = require('./babel.config.js')
const { get } = require('@keg-hub/jsutils')
const platform = process.env.RE_PLATFORM || 'web'
const ENV = process.env.NODE_ENV || process.env.ENV || 'development'

// Hard coded plugins
const addPlugins = [
  // Find the DefinePlugin, and add the ENV
  new webpack.DefinePlugin({ RE_PLATFORM: platform, PLATFORM: platform })
]

// Hard coded aliases
const addAliases = {
  // Add the react-native-web overwrite
  'react-native': 'react-native-web',
  'react-native-web': 'react-native-web',
  'react-native-svg': 'react-native-svg-web',
  '@keg-hub/jsutils': '@keg-hub/jsutils/build/esm',
  '@keg-hub/re-theme': '@keg-hub/re-theme/build/esm/web',
}

// Hard coded Rules
const addRules = [
  {
    test: /\.(js|jsx)$/,
    include: [
      path.resolve(__dirname, "../node_modules/@keg-hub/re-theme"),
    ],
    use: {
      loader: "babel-loader",
      options: { ...babelConfig }
    }
  }
]

// Set custom extensions based on the platform
// This will ensure the platform file is loaded over the default
const customExtensions = extensions => {
  return [
    `${platform}.cjs`,
    `${platform}.mjs`,
    `${platform}.js`,
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
          RE_PLATFORM: JSON.stringify(platform),
          PLATFORM: JSON.stringify(platform),
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

// Set custom watch options for webpack re-load
// Add re-theme build folder so we re-load webpack anytime re-theme re-builds
const customWatchOptions = options => {
  return {
    ...options,
    ignored: [
      ...(options.ignored || []),
      /node_modules([\\]+|\/)+(?!\@keg-hub\/re-theme\/build\/esm\/web)/,
    ]
  }
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

  // Setup custom watch options, to watch more then the src directory
  // Only want to watch other locations when in development mode
  ENV === 'development' && (
    config.watchOptions = customWatchOptions(config.watchOptions || {})
  )

  return config
}
