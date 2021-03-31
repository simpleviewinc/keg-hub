const { keyMap, deepFreeze } = require('@keg-hub/jsutils')

/**
 * Tap Resolver Constants
 */
module.exports = deepFreeze({
  /**
   * Locations where the tap resolver config could be located.
   * Tap resolver will look for the first item in this array,
   * and if it doesn't find it, then it tries the next, etc.
   */
  configNames: [
    'tap.config.js',
    'tap.js',
    'tap.config.json',
    'tap.json',
    'app.config.js',
    'app.js',
    'app.config.json',
    'app.json',
    'package.json',
  ],
  /**
   * Constants added to temp config files for reference
   */
  configKeys: keyMap([ 'TAP_RESOLVER_LOC', 'TAP_RESOLVER_FILE' ]),
  /**
   * Default assets path, relative to the base path of the app config
   */
  assetsPath: 'assets',
  assetsIndex: 'index',
  fontsPath: 'assets/fonts',
  fontsIndex: 'index',

  /**
   * Files and asset extensions that can be resolved
   */
  extensions: {
    fonts: [ '.ttf', '.otf' ],
    assets: [ '.png', '.jpg', '.jpeg', '.gif', '.ttf', '.otf' ],
    resolve: [
      '.web.js',
      '.native.js',
      '.ios.js',
      '.android.js',
      '.js',
      '.json',
      '.sqlite',
      '.ttf',
    ],
  },
})
