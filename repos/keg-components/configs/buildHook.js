const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)

/**
 * Runs a command in a terminal
 * @param {string} cmd - Command to run
 *
 * @returns result of that command
 */
const runCmd = async (cmd) => {
  try {
    const output = await cmdExec(cmd)
    return output
  }
  catch(e){
    console.log(e.stack)
  }
}

/**
 * Copies the build into keg-core
 * Assumes keg-core is 2 directories back
 * So your folder tree should look like this
 * - repos folder
 *   - tap-demo
 *     - node_modules
 *       - sv-keg
 *         - node_modules
 *           - keg-components
 *             - build ( copies build to here )
 *   - keg-components
 *     - build ( copies build from here )
 * Also creates a kc-touch.js file in the tap to cause it to auto reload
 */
const copyToTap = async tapName => {

  // Change this line if you tap is in a different location
  const tapLoc = path.join(__dirname, '../../', tapName)
  
  const fromLoc = path.join(__dirname, '../build')
  // Change this line if the taps -> keg is installed in a different location
  const toLoc = path.join(tapLoc, 'node_modules/sv-keg/node_modules/keg-components/build')

  console.log(`Removing files at \n ${toLoc}`)
  await runCmd(`rm -rf ${toLoc}`)
  
  console.log(`Copy keg-components build to \n ${toLoc}`)
  await runCmd(`cp -Rf ${fromLoc} ${toLoc}`)
  
  console.log(`Force refresh...`)
  await runCmd(`touch ${tapLoc}/kc-touch.js`)

  console.log(`Finished build copy!`)
}

/**
 * Copies the build into keg-core
 * Assumes keg-core is 2 directories back
 * So your folder tree should look like this
 * - repos folder
 *   - keg-core
 *     - node_modules
 *       - keg-components
 *         - build ( copies build to here )
 *   - keg-components
 *     - build ( copies build from here )
 * Also creates a kc-touch.js file in the tap to cause it to auto reload
 */
const copyToKeg = async () => {
  // Change this line if the keg is installed in a different location
  const tapLoc = path.join(__dirname, '../../keg-core')
  
  const fromLoc = path.join(__dirname, '../build')
  
  const toLoc = path.join(tapLoc, 'node_modules/keg-components/build')

  console.log(`Removing files at \n ${toLoc}`)
  await runCmd(`rm -rf ${toLoc}`)
  
  console.log(`Copy keg-components build to \n ${toLoc}`)
  await runCmd(`cp -Rf ${fromLoc} ${toLoc}`)
  
  console.log(`Force refresh...`)
  await runCmd(`touch ${tapLoc}/kc-touch.js`)

  console.log(`Finished build copy!`)
}

/**
 * Copies the keg-components build to a tap or kegs directory
 * Allows working on keg-components while also running inside a tap context
 *
 * @export
 * @param {string} devMode - The mode that the keg-components is be run in
 *                           Should be the name of a tap folder || keg
 * @returns {void}
 */
export default function buildHook(devMode){
  return {
    name: 'buildHook',
    buildEnd: async () => {

      if(!devMode) return
      
      if(devMode.indexOf('tap-') !== -1) return copyToTap(devMode)
      else if(devMode === 'keg') return copyToKeg(devMode)

    }
  }
}
