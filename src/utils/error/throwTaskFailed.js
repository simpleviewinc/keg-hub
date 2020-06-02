const { getSetting } = require('../globalConfig/getSetting')
/**
 * Throws task failed error
 *
 * @returns {void}
 */
const throwTaskFailed = () => {
  getSetting('errorStack')
    ? (() => { throw new Error(`Task failed!`) })()
    : process.exit(1)
}

module.exports = {
  throwTaskFailed
}