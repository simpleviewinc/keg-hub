
const { Logger } = require('KegLog')
const { get, checkCall, deepMerge, isFunc, isArr } = require('@keg-hub/jsutils')
const cliProgress = require('cli-progress')
const cliSpinners = require('cli-spinners')
const logUpdate = require('log-update')

/**
 * Create a new progress bar instance and use shades_classic theme
 * <br/> Set the total, and the starting amount
 * @param {Object} total - Total amount for the progress bar
 * @param {string} start - Start amount for the progress bar
 *
 * @returns {Object} - ProgressBar
 */
const createBar = (title, { total=100, start=0, preset, ...config }) => {
  title && Logger.log(title)

  // Create the new progressBar
  const bar = new cliProgress.SingleBar({
    clearOnComplete: true,
    format: ' {bar} | {percentage}%',
    hideCursor: true,
    ...config,
  }, preset || cliProgress.Presets.shades_classic)

  // start the progress bar with a total value of 100 and start value of 0
  bar.start(total, start)

  return bar
}

const createSpinner = ({ spinner }) => {
  return cliSpinners[ spinner || 'bouncingBall' ]
}

const startSpinner = loading => {
  if(!loading.active || loading.loader.stop) return

  const { frames, interval } = loading.loader
  let i = 0

  const timeout = setInterval(() => {
    logUpdate(` ${ frames[i = ++i % frames.length] } ${ loading.title }`)
  }, interval)
  
  loading.loader.stop = () => {
    // Clear the timeout
    clearInterval(timeout)
  }

}

const defaults = {
  increment: 1,
  config: {
    active: false,
    offMatch: undefined,
    type: 'bar',
  },
  options: {
    start: 0,
    total: 100,
  }
}


class Loading {

  constructor(options, loadConf){
    loadConf.offMatch = isArr(loadConf.offMatch) ? loadConf.offMatch : [ loadConf.offMatch ]
    const config = deepMerge(defaults.config, loadConf)

    this.options = deepMerge(defaults.options, options)
    this.loader = config.type !== 'bar'
      ? createSpinner(config)
      : createBar(config.title, this.options)
    
    // Add the config to the Loading instance
    Object.assign(this, config)

    return this
  }

  isBar = () => this.type === 'bar'

  /**
  * Helper to add percentage to the loader
  * @param {number} amount - The amount to increase the progress bar by
  *
  * @returns {void}
  */
  add = amount => {
    !this.isBar()
      ? startSpinner(this)
      : this.loader.increment(amount || defaults.config.increment)
  }

  /**
  * Helper to set the loader to a finished state
  * <br/> Updates the loader to the full amount, then stops it
  *
  * @returns {void}
  */
  finish = () => {
    this.isBar() && this.loader.update(this.options.total)
    isFunc(this.loader.stop) && this.loader.stop()
    const loading = this
    setTimeout(() => {
      loading.finishMessage && Logger.log(loading.finishMessage)
    }, 1000)
  }

  /**
  * Updates the progress bar instance to the passed in amount
  * @param {number} amount - The amount to increase the progress bar by
  *
  * @returns {void}
  */
  update = (amount) => amount && this.isBar() && this.loader.update(amount)

  /**
  * Updates the progress bar instance by the increment amount, or stopping
  * @param {number} amount - The amount to increase the progress bar by
  * @param {string|boolean} data - Toggle to turn the loader off
  *
  * @returns {void}
  */
  progress = (amount, data) => {

    // Add to the progress amount if it's passed in
    amount && this.add(amount)

    // Check if loading is still active based on the passed in data
    this.checkActive(data)

    // If no longer active, then call finish
    !this.active && this.finish()
  }

  /**
  * Checks if loading is active, and if it should be turned off
  * <br/> Checks the passed in data, to see if it should turn off loading
  * @param {string|boolean} data - Toggle to turn the loader off
  *
  * @returns {boolean} - True if loading is active / False if loading is not
  */
  checkActive = data => {
    const check = data.trim()

    // Check if loading is currently active, and if it should be turned off
    this.offMatch.map(match => {
      this.active &&
        ( check === match || ( isFunc(check.includes) && check.includes(match) )) &&
        ( this.active = false )
    })

    return this.active
  }

}

module.exports = {
  Loading
}