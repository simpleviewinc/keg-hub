/** @module functions */

/**
 * Helper to call waitForIt in-between check calls
 * @ignore
 * @function
 * @param {Object} waitArgs - All arguments passed to the waitForIt method
 * @param {aArray} args - All arguments forwarded to the check and onFinish methods
 *
 * @returns {Promise}
 */
const inBetween = (waitArgs, args) => {
  return new Promise(async (res, rej) => {
    setTimeout(async () => {
      res(await waitForIt(waitArgs, args))
    }, waitArgs.wait)
  })
}

/**
 * Waits for check method to return true before calling onFinish
 * <br/>Will call the passed in checkMethod x (amount) number of times before failing
 * <br/>Will wait x ( wait ) milliseconds between calls to the check method
 * @function
 * @param {function} args.check - checks if onFinished should be called ( returns true )
 * @param {function} args.onFinish - called when check methods returns true
 * @param {number} [args.amount=4] - Amount of times to call the check before failing
 * @param {number} [args.wait=1000] - Time to wait between each check
 * @param {Array} [...args] - Arguments to pass to the check, and onFinish methods
 *
 * @returns {Promise}
 */
export const waitForIt = ({ check, onFinish, amount=4, wait=1000, total }, ...args) => {
  total = total || 0
  return new Promise(async (res, rej) => {
    total++

    const finished = await check(total, ...args)
    if(!finished && total >= amount) rej(false)

    finished
      ? res(onFinish(finished, ...args))
      : res(await inBetween({ check, onFinish, amount, wait, total }, args))
  })

}
