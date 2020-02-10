const { keyMap, deepFreeze } = require('jsutils')

/**
 * Tap Resolver Constants
 */
module.exports = deepFreeze({
  /**
  * Locations where the tap resolver config could be located.
  */
  configNames: [
    'tap.config.json',
    'tap.json',
    'app.json',
    'package.json',
  ],
  /**
  * Constants added to temp config files for reference
  */
  configKeys: keyMap([
    'TAP_RESOLVER_LOC',
    'TAP_RESOLVER_FILE',
  ]),
  /**
  * Default assets path, relative to the base path of the app config
  */
  assetsPath: 'assets',
  
  /**
  * Files and asset extensions that can be resolved
  */
  extensions: {
    assets: [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.ttf',
    ],
    resolve: [
      ".web.js",
      ".native.js",
      ".ios.js",
      ".android.js",
      ".js",
      ".json",
      ".sqlite",
      ".ttf"
    ]
  }
})
