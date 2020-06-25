const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
const { Builder } = require('selenium-webdriver')

/**
 * Type Definition: the options to be passed to buildDriver()
 * @typedef {Object} DriverOptions
 * @property {string} browser - the browser name. One of the values listed here: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/capabilities_exports_Browser.html
 * @property {string} serverURL - the url of a remote selenium server. If undefined, uses a local instance, not remote
 * @property {boolean} headless - runs the browser in headless mode if true
 * @property {Object} screen - the window size properties of the browser to test
 * @property {number} screen.width - window width
 * @property {number} screen.height - window height
 */

/**
 * Assigns browser-options common across browsers
 * @param {Object} optionsBuilder - the selenium webdriver builder instance
 * @param {DriverOptions} options - the options to add to the builder
 * @returns {Object} - the builder
 */
const assignBrowserOptions = (optionsBuilder, options={}) => {
  const { 
    screen,
    headless,
  } = options

  screen && optionsBuilder.windowSize(screen)
  headless && optionsBuilder.headless()
  return optionsBuilder
}

/**
 * Assigns driver-options common across browsers
 * @param {Object} driverBuilder - the selenium webdriver builder instance
 * @param {Object} options - the options to add to the builder
 * @param {string} options.serverURL - (optional) - the url of a remote server
 * @returns {Object} - the builder
 */
const assignDriverOptions = (driverBuilder, options) => {
  const { serverURL, } = options
  serverURL && driverBuilder.usingServer(serverURL)
  return driverBuilder
}

/**
 * Builds and configures the chrome web driver to use in tests
 * @param {DriverOptions} options - options to configure the driver
 * @returns {Object} - the built driver
 */
const buildChromeDriver = (options) => {
  const chromeOptions = assignBrowserOptions(new chrome.Options(), options)
  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
  assignDriverOptions(builder, options)
  return builder.build()
}

/**
 * Builds and configures the firefox web driver to use in tests
 * @param {DriverOptions} options - options to configure the driver
 * @returns {Object} - the built driver
 */
const buildFirefoxDriver = (options) => {
  const firefoxOptions = assignBrowserOptions(new firefox.Options(), options)
  const builder = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(firefoxOptions)
  assignDriverOptions(builder, options)
  return builder.build()
}

/**
 * The map of builder functions, keyed by browser name
 */
const builderMap = {
  chrome: buildChromeDriver,  
  firefox: buildFirefoxDriver,  
}

/**
 * Builds the driver for tests, configured by the options
 * @param {DriverOptions} options 
 * @returns {Object} - the built driver
 */
module.exports.buildDriver = (options) => {
  const builder = builderMap[options.browser]
  return builder(options)
}
