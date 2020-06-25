const { setWorldConstructor, After } = require('cucumber')
const { buildDriver } = require('../../utils')

const { 
  BROWSER='chrome',
  HEADLESS,
  HUB_HOST,
  HUB_PORT,
  WINDOW_WIDTH=640,
  WINDOW_HEIGHT=480
} = process.env

/**
 * @type {DriverOptions}
 */
const options = {
  browser: BROWSER,
  serverURL: HUB_HOST && `http://${HUB_HOST}:${HUB_PORT}/wd/hub`,
  headless: JSON.parse(HEADLESS || true),
  screen: {
    width: parseInt(WINDOW_WIDTH),
    height: parseInt(WINDOW_HEIGHT)
  }
}

/**
 * The cucumber world-constructor function that sets up the driver
 * @constructor
 * @param {Object} params - params defined by cucumber (currently unused here)
 */
function PreTestSetup() {
  console.log('Building driver with options:', options)
  // instantiate and configure the driver
  this.driver = buildDriver(options)
}

/**
 * The function that executes when a scenario is complete
 */
function PostTestCleanup() {
  // terminate the browser session, closing the browser,
  // and freeing up a selenium grid node if runnning with grid
  this.driver.quit() 
}

setWorldConstructor(PreTestSetup)
After(PostTestCleanup)