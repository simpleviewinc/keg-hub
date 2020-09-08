const util = require('util')
const exec = util.promisify(require('child_process').exec)
const rootDir = require('app-root-path').path

/**
 * Runs `yarn app:install - which sets up the /app`
 */
const setupApp = async () => {
  console.log(`-----running yarn app:install-----`)
  try {
    await exec(`cd ${rootDir} && yarn app:install`)
  }
  catch (error) {
    console.error(error.stderr)
  }
}

;(async () => {
  if (__dirname.includes('node_modules')) return

  await setupApp()
})()
